// Slot machine starter code using PixiJS

// Wait for DOM to be loaded
window.addEventListener('DOMContentLoaded', () => {
    initGame();
});

function initGame() {
    // Check if PIXI is loaded
    if (typeof PIXI === 'undefined') {
        console.error('PIXI.js is not loaded!');
        return;
    }
    
    console.log('Initializing game...');
    console.log('PIXI version:', PIXI.VERSION || 'Unknown');
    
    // Create PIXI application using v6 syntax
    const app = new PIXI.Application({ 
        width: 1100, 
        height: 720, // Reduced from 800 to eliminate empty space
        backgroundColor: 0x1a0d2e, // Dark purple gradient background
        antialias: true
    });
    
    const gameContainer = document.getElementById('game-container');
    if (!gameContainer) {
        console.error('Game container not found!');
        return;
    }
    
    // Add some styling to the canvas
    app.view.style.border = '3px solid #FFD700';
    app.view.style.marginTop = '20px';
    app.view.style.borderRadius = '10px';
    app.view.style.boxShadow = '0 0 20px rgba(255, 215, 0, 0.5)';
    app.view.style.background = 'linear-gradient(45deg, #1a0d2e, #0f051a)';
    
    gameContainer.appendChild(app.view);
    console.log('Canvas added to container');

    // Continue with the rest of the game setup
    setupGame(app);
}


function setupGame(app) {
    // Reel settings
    const reelWidth = 160;
    const symbolSize = 150;

    // create money variables
    let playerBalance = 1000;
    let currentBet = 10;
    let lastWin = 0;

    // Create symbol textures using PixiJS Graphics
    const symbolData = [
        { text: 'A', bgColor: 0xCC0000, borderColor: 0xFF4444, textColor: '#FFFFFF' },
        { text: 'K', bgColor: 0x00AA00, borderColor: 0x44FF44, textColor: '#FFFFFF' },
        { text: 'Q', bgColor: 0x0066CC, borderColor: 0x4499FF, textColor: '#FFFFFF' },
        { text: '$', bgColor: 0xFFAA00, borderColor: 0xFFDD44, textColor: '#000000' },
        { text: '🔔', bgColor: 0xAA00AA, borderColor: 0xDD44DD, textColor: '#FFFFFF' },
        { text: '⭐', bgColor: 0x00AAAA, borderColor: 0x44DDDD, textColor: '#FFFFFF' }
    ];

    function createSymbolTexture(symbolInfo) {
        const graphics = new PIXI.Graphics();
        
        // Create gradient effect with rounded corners
        graphics.beginFill(symbolInfo.bgColor);
        graphics.lineStyle(4, symbolInfo.borderColor, 1);
        graphics.drawRoundedRect(5, 5, 140, 140, 15); // Rounded corners with border
        graphics.endFill();
        
        // Add inner glow effect
        graphics.beginFill(symbolInfo.borderColor, 0.3);
        graphics.drawRoundedRect(8, 8, 134, 134, 12);
        graphics.endFill();

        const text = new PIXI.Text(symbolInfo.text, {
            fontFamily: 'Arial Black, Arial',
            fontSize: 52,
            fill: symbolInfo.textColor,
            align: 'center',
            fontWeight: 'bold',
            stroke: symbolInfo.text === '$' ? '#FFFFFF' : '#000000',
            strokeThickness: 3,
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 3
        });
        
        text.anchor.set(0.5);
        text.x = 75;
        text.y = 75;
        graphics.addChild(text);

        return app.renderer.generateTexture(graphics);
    }

    const symbolTextures = symbolData.map(createSymbolTexture);

    const reels = [];
    
    // Create separate containers for border and content
    const reelsBorderContainer = new PIXI.Container();
    const reelsContentContainer = new PIXI.Container();
    app.stage.addChild(reelsBorderContainer);
    app.stage.addChild(reelsContentContainer);
    
    // Add border to border container (this won't be affected by mask)
    const reelsBorder = new PIXI.Graphics();
    
    // Outer metallic border
    reelsBorder.lineStyle(8, 0xC0C0C0); // Silver outer border
    reelsBorder.beginFill(0x000000, 0);
    reelsBorder.drawRoundedRect(-4, -4, 808, 608, 15);
    reelsBorder.endFill();
    
    // Inner gold border
    reelsBorder.lineStyle(4, 0xFFD700); // Gold inner border
    reelsBorder.drawRoundedRect(0, 0, 800, 600, 10);
    
    // Background with subtle gradient
    reelsBorder.beginFill(0x1a1a1a);
    reelsBorder.drawRoundedRect(2, 2, 796, 596, 8);
    reelsBorder.endFill();
    
    reelsBorderContainer.addChild(reelsBorder);

    // Add mask to content container only
    const reelsMask = new PIXI.Graphics();
    reelsMask.beginFill(0xFFFFFF);
    reelsMask.drawRoundedRect(4, 4, 792, 592, 8); // Adjusted to match border
    reelsMask.endFill();
    reelsContentContainer.addChild(reelsMask);
    reelsContentContainer.mask = reelsMask;

    for (let i = 0; i < 5; i++) {
      const rc = new PIXI.Container();
      rc.x = i * reelWidth;
      reelsContentContainer.addChild(rc); // Add to content container, not border container

      const symbols = [];
      // Create more symbols (6 instead of 4) so there are always symbols visible
      // Some will start above the visible area
      for (let j = 0; j < 6; j++) {
        const symbol = new PIXI.Sprite(symbolTextures[Math.floor(Math.random() * symbolTextures.length)]);
        symbol.y = (j - 1) * symbolSize; // Start one symbol above (j-1 means first symbol at y=-150)
        symbol.scale.set(symbolSize / symbol.width);
        rc.addChild(symbol);
        symbols.push(symbol);
      }

      reels.push({ container: rc, symbols, position: 0, previousPosition: 0, blur: new PIXI.filters.BlurFilter(), stopping: false, stopSpeed: 20, stopTime: 0, currentTime: 0 });
    }

    // Add horizontal guide lines to show symbol stop positions (AFTER reels so they appear on top)
    const guideLines = new PIXI.Graphics();
    
    // Create glowing effect for guide lines
    guideLines.lineStyle(4, 0xFFD700, 0.8); // Gold with transparency
    
    // Draw only 2 lines to mark the winning row boundaries
    // Top line of the middle row (where winning symbols should align)
    const topWinningLine = symbolSize; // y = 150 (top of middle symbols)
    guideLines.moveTo(10, topWinningLine);
    guideLines.lineTo(790, topWinningLine);
    
    // Bottom line of the middle row (where winning symbols should align)
    const bottomWinningLine = symbolSize * 2; // y = 300 (bottom of middle symbols)
    guideLines.moveTo(10, bottomWinningLine);
    guideLines.lineTo(790, bottomWinningLine);
    
    // Add glow filter to guide lines (temporarily disabled for debugging)
    // const glowFilter = new PIXI.filters.GlowFilter({
    //     distance: 10,
    //     outerStrength: 2,
    //     innerStrength: 1,
    //     color: 0xFFD700,
    //     quality: 0.5
    // });
    // guideLines.filters = [glowFilter];
    
    reelsContentContainer.addChild(guideLines); // Add to content container so it appears on top

    // Create separate containers for border and content
    const moneyBorderContainer = new PIXI.Container();
    const moneyContentContainer = new PIXI.Container();
    moneyBorderContainer.y = 620; // Perfect fit for 720px canvas height
    moneyContentContainer.y = 620;
    app.stage.addChild(moneyBorderContainer);
    app.stage.addChild(moneyContentContainer);
    
    // Add border to border container (won't be affected by mask)
    const moneyBorder = new PIXI.Graphics();
    
    // Metallic border with gradient
    moneyBorder.lineStyle(4, 0xC0C0C0); // Silver border
    moneyBorder.beginFill(0x2a2a2a); // Dark background
    moneyBorder.drawRoundedRect(0, 0, 800, 90, 8); // Made taller (was 80)
    moneyBorder.endFill();
    
    // Inner accent border
    moneyBorder.lineStyle(2, 0xFFD700); // Gold accent
    moneyBorder.drawRoundedRect(2, 2, 796, 86, 6);
    
    moneyBorderContainer.addChild(moneyBorder);
    
    // Add mask to content container only (temporarily disabled to debug)
    // const moneyMask = new PIXI.Graphics();
    // moneyMask.beginFill(0xFFFFFF);
    // moneyMask.drawRoundedRect(4, 4, 792, 72, 6); // Adjusted to match border
    // moneyMask.endFill();
    // moneyContentContainer.addChild(moneyMask);
    // moneyContentContainer.mask = moneyMask;
    
    // Player balance display
    const balanceText = new PIXI.Text(`Balance: $${playerBalance}`, { 
        fill: '#FFD700', 
        fontSize: 24, 
        fontWeight: 'bold'
    });
    balanceText.x = 20;
    balanceText.y = 25;
    moneyContentContainer.addChild(balanceText);
    
    // Last win bet display
    const lastWinText = new PIXI.Text(`Last Win: $${lastWin}`, { 
        fill: '#00FF88', 
        fontSize: 24, 
        fontWeight: 'bold'
    });
    lastWinText.x = 280;
    lastWinText.y = 25;
    moneyContentContainer.addChild(lastWinText);
    
    // Update money display
    const betText = new PIXI.Text(`Current Bet: $${currentBet}`, { 
        fill: '#FF6B6B', 
        fontSize: 24, 
        fontWeight: 'bold'
    });
    betText.x = 550;
    betText.y = 25;
    moneyContentContainer.addChild(betText);

    // Create win message (initially hidden)
    const winMessage = new PIXI.Text('', { 
        fill: '#FFD700', 
        fontSize: 48, 
        fontWeight: 'bold',
        stroke: '#000000',
        strokeThickness: 3
    });
    winMessage.anchor.set(0.5);
    winMessage.x = 400; // Center of reels area
    winMessage.y = 300; // Middle of reels area
    winMessage.visible = false;
    app.stage.addChild(winMessage); // Add to main stage so it appears on top

    // Create separate containers for border and content
    const controlsBorderContainer = new PIXI.Container();
    const controlsContentContainer = new PIXI.Container();
    controlsBorderContainer.x = 810; // Move left so it's visible (was 820)
    controlsContentContainer.x = 810;
    app.stage.addChild(controlsBorderContainer);
    app.stage.addChild(controlsContentContainer);
    
    // Add border to border container (won't be affected by mask)
    const controlsBorder = new PIXI.Graphics();
    
    // Metallic border with gradient
    controlsBorder.lineStyle(4, 0xC0C0C0); // Silver border
    controlsBorder.beginFill(0x2a2a2a); // Dark background
    controlsBorder.drawRoundedRect(0, 0, 280, 600, 10); // Made wider (was 260)
    controlsBorder.endFill();
    
    // Inner accent border
    controlsBorder.lineStyle(2, 0xFFD700); // Gold accent
    controlsBorder.drawRoundedRect(2, 2, 276, 596, 8);
    
    controlsBorderContainer.addChild(controlsBorder);
    
    // Add mask to content container only (temporarily disabled to debug)
    // const controlsMask = new PIXI.Graphics();
    // controlsMask.beginFill(0xFFFFFF);
    // controlsMask.drawRoundedRect(4, 4, 252, 592, 8); // Adjusted to match border
    // controlsMask.endFill();
    // controlsContentContainer.addChild(controlsMask);
    // controlsContentContainer.mask = controlsMask;
    
    // Function to create styled button
    function createStyledButton(text, x, y, color = 0x4CAF50) {
        const buttonContainer = new PIXI.Container();
        
        // Button background
        const buttonBg = new PIXI.Graphics();
        buttonBg.beginFill(color);
        buttonBg.drawRoundedRect(0, 0, 80, 50, 10);
        buttonBg.endFill();
        
        // Button text
        const buttonText = new PIXI.Text(text, {
            fontSize: 24,
            fill: '#FFFFFF',
            fontWeight: 'bold'
        });
        buttonText.anchor.set(0.5);
        buttonText.x = 40;
        buttonText.y = 25;
        
        buttonContainer.addChild(buttonBg);
        buttonContainer.addChild(buttonText);
        buttonContainer.x = x;
        buttonContainer.y = y;
        buttonContainer.interactive = true;
        buttonContainer.buttonMode = true;
        
        return buttonContainer;
    }
    
    // Create styled buttons
    const betPlusButton = createStyledButton('+', 100, 200, 0x4CAF50); // Green
    const betMinusButton = createStyledButton('-', 100, 140, 0xF44336); // Red
    const spinButton = createStyledButton('SPIN', 100, 260, 0xFF9800); // Orange - centered horizontally
    
    controlsContentContainer.addChild(betPlusButton);
    controlsContentContainer.addChild(betMinusButton);
    controlsContentContainer.addChild(spinButton);

    let running = false;

    // Event listeners for bet adjustment buttons
    betPlusButton.on('pointerdown', () => {
      if (running) return;
      if (currentBet >= playerBalance || currentBet >= 30) {
        console.warn('Cannot increase bet beyond player balance or $30');
        return;
      }
      else{
        currentBet += 5;
        betText.text = `Current Bet: $${currentBet}`;
      }
    });

    betMinusButton.on('pointerdown', () => {
      if (running) return;
      if (currentBet <= 5) {
        console.warn('Cannot decrease bet below $5');
        return;
      }else {
        currentBet -= 5;
        betText.text = `Current Bet: $${currentBet}`;
      }
    })

    spinButton.on('pointerdown', () => {
      if (running) return;
      running = true;
      startSpin();
    });

    function startSpin() {
      // Deduct bet from balance
      playerBalance -= currentBet;
      balanceText.text = `Balance: $${playerBalance}`;
      
      for (let i = 0; i < reels.length; i++) {
        const r = reels[i];
        r.previousPosition = r.position;
        r.position += 15 + Math.random() * 5; // Random spin duration
        r.stopping = false; // Reset stopping state
        r.stopSpeed = 20; // Reset to initial spin speed
        r.stopTime = 60 + (i * 30); // Each reel stops 30 frames after the previous one
        r.currentTime = 0; // Reset time counter for this reel
      }
    }

    // Function to get the symbol text from middle row of each reel
    function getMiddleRowSymbols() {
      const middleSymbols = [];
      for (let i = 0; i < reels.length; i++) {
        const reel = reels[i];
        // Look for the symbol that's exactly at position y = 150 (which is symbolSize * 1)
        // This is the middle symbol between our two guide lines
        for (let j = 0; j < reel.symbols.length; j++) {
          const symbol = reel.symbols[j];
          if (symbol.y === symbolSize) { // Exactly at y = 150 (middle row)
            const symbolText = getSymbolTextFromTexture(symbol.texture);
            middleSymbols.push(symbolText);
            break;
          }
        }
      }
      return middleSymbols;
    }

    // Helper function to get symbol text from texture
    function getSymbolTextFromTexture(texture) {
      // Find matching symbol in symbolData by comparing texture
      for (let i = 0; i < symbolTextures.length; i++) {
        if (symbolTextures[i] === texture) {
          return symbolData[i].text;
        }
      }
      return '?'; // fallback
    }

    // Function to check for horizontal wins
    function checkForWins() {
      const middleRow = getMiddleRowSymbols();
      console.log('Middle row symbols:', middleRow);
      
      let winAmount = 0;
      
      // Check for 3, 4, or 5 in a row from left
      for (let startPos = 0; startPos <= 2; startPos++) { // Can start at position 0, 1, or 2
        for (let length = 5; length >= 3; length--) { // Check 5, then 4, then 3 in a row
          if (startPos + length > 5) continue; // Skip if goes beyond reel count
          
          const symbol = middleRow[startPos];
          let isMatch = true;
          
          // Check if all symbols in this sequence match
          for (let i = startPos + 1; i < startPos + length; i++) {
            if (middleRow[i] !== symbol) {
              isMatch = false;
              break;
            }
          }
          
          if (isMatch) {
            // Calculate win based on symbol and length
            const symbolMultiplier = getSymbolMultiplier(symbol);
            const lengthMultiplier = length; // 3x for 3-in-a-row, 4x for 4-in-a-row, 5x for 5-in-a-row
            winAmount = currentBet * symbolMultiplier * lengthMultiplier;
            
            console.log(`WIN! ${length} ${symbol}s in a row! Win: $${winAmount}`);
            
            // Update balance and display
            playerBalance += winAmount;
            lastWin = winAmount;
            balanceText.text = `Balance: $${playerBalance}`;
            lastWinText.text = `Last Win: $${lastWin}`;
            
            // Show win message
            winMessage.text = `BIG WIN!\n${length} ${symbol}s\n$${winAmount}`;
            winMessage.visible = true;
            
            // Hide win message after 3 seconds
            setTimeout(() => {
              winMessage.visible = false;
            }, 3000);
            
            return winAmount; // Return early on first win found
          }
        }
      }
      
      // No win
      lastWin = 0;
      lastWinText.text = `Last Win: $${lastWin}`;
      return 0;
    }

    // Function to get symbol multiplier
    function getSymbolMultiplier(symbol) {
      const multipliers = {
        '$': 10,   // Highest value
        '⭐': 8,
        '🔔': 6,
        'A': 4,
        'K': 3,
        'Q': 2     // Lowest value
      };
      return multipliers[symbol] || 1;
    }

    app.ticker.add((delta) => {
      if (!running) return; // Don't process if not spinning
      
      let allReelsStopped = true;
      
      for (let i = 0; i < reels.length; i++) {
        const r = reels[i];
        
        // Increment time for this reel
        r.currentTime += delta;
        
        // Check if this reel is still spinning
        if (r.currentTime < r.stopTime) {
          allReelsStopped = false;
          
          // Reel is still spinning at full speed
          for (let j = 0; j < r.symbols.length; j++) {
            const s = r.symbols[j];
            s.y += r.stopSpeed * delta;

            // When a symbol goes below the bottom, wrap it to the top
            if (s.y >= symbolSize * (r.symbols.length - 1)) {
              s.y -= symbolSize * r.symbols.length;
              s.texture = symbolTextures[Math.floor(Math.random() * symbolTextures.length)];
            }
          }
        } else if (r.stopping) {
          // Reel is in the process of stopping
          allReelsStopped = false;
          
          r.stopSpeed *= 0.92; // Continue slowing down
          
          for (let j = 0; j < r.symbols.length; j++) {
            const s = r.symbols[j];
            s.y += r.stopSpeed * delta;

            // When a symbol goes below the bottom, wrap it to the top
            if (s.y >= symbolSize * (r.symbols.length - 1)) {
              s.y -= symbolSize * r.symbols.length;
              s.texture = symbolTextures[Math.floor(Math.random() * symbolTextures.length)];
            }
          }
          
          // Check if reel has slowed down enough to stop
          if (r.stopSpeed < 0.5) {
            r.stopping = false; // Mark as fully stopped
            r.stopSpeed = 0;
            
            // Snap symbols to exact grid positions
            for (let j = 0; j < r.symbols.length; j++) {
              const s = r.symbols[j];
              const targetY = Math.round(s.y / symbolSize) * symbolSize;
              s.y = targetY;
            }
            
            console.log(`Reel ${i + 1} stopped`);
          }
        } else if (r.currentTime >= r.stopTime && r.stopSpeed > 0) {
          // Time to start stopping this reel
          r.stopping = true;
          allReelsStopped = false;
          
          // Continue spinning but gradually slow down
          r.stopSpeed *= 0.92; // Reduce speed each frame
          
          for (let j = 0; j < r.symbols.length; j++) {
            const s = r.symbols[j];
            s.y += r.stopSpeed * delta;

            // When a symbol goes below the bottom, wrap it to the top
            if (s.y >= symbolSize * (r.symbols.length - 1)) {
              s.y -= symbolSize * r.symbols.length;
              s.texture = symbolTextures[Math.floor(Math.random() * symbolTextures.length)];
            }
          }
          
          // Check if reel has slowed down enough to stop
          if (r.stopSpeed < 0.5) {
            r.stopping = false; // Mark as fully stopped
            r.stopSpeed = 0;
            
            // Snap symbols to exact grid positions
            for (let j = 0; j < r.symbols.length; j++) {
              const s = r.symbols[j];
              const targetY = Math.round(s.y / symbolSize) * symbolSize;
              s.y = targetY;
            }
            
            console.log(`Reel ${i + 1} stopped`);
          }
        }
        // If reel has stopSpeed = 0 and not stopping, it's completely stopped
        else if (r.stopSpeed === 0 && !r.stopping) {
          // This reel is stopped, don't change allReelsStopped
        } else {
          allReelsStopped = false;
        }
      }
      
      // Check if all reels have completely stopped
      if (allReelsStopped) {
        running = false; // Set running to false so buttons work again
        console.log('All reels stopped! Checking for wins...');
        
        // Final alignment check
        for (let reelIndex = 0; reelIndex < reels.length; reelIndex++) {
          const reel = reels[reelIndex];
          for (let symbolIndex = 0; symbolIndex < reel.symbols.length; symbolIndex++) {
            const symbol = reel.symbols[symbolIndex];
            const targetY = Math.round(symbol.y / symbolSize) * symbolSize;
            symbol.y = targetY;
          }
        }
        
        // Check for wins
        setTimeout(() => {
          checkForWins();
        }, 200);
      }
    });
}