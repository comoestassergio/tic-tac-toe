(function (){
    const game = {
        currentMark: "x",
        WIN_COMBINATIONS: [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ],
    
        init: function () {
            this.cacheDom()
            this.startGame()
        },
    
        cacheDom: function() {
            this.board = document.querySelector(".game-grid")
            this.cells = document.querySelectorAll(".game-cell")
            this.playerEl = document.querySelector(".player-el") 
            this.clearBtn = document.querySelector(".clear-btn")
            this.winScreen = document.querySelector(".win-screen")
        }, 
    
        locateClicks: function(){
            const cells = this.cells

            cells.forEach(cell => {
                cell.classList.remove("x")
                cell.classList.remove("circle")
                cell.removeEventListener('click', function(){})

                cell.addEventListener("click", function(){
                    game.placeMark(cell)
                    game.swapPlayer()
                    game.updateBoardClass()
                }, {once: true})
            })
        },

        startGame: function(){
            this.board.classList.add(this.currentMark)
            if (game.winScreen.classList.contains("visible")){
                game.winScreen.classList.toggle("visible")
            }

            game.locateClicks()
        }, 

        placeMark: function(cell){
            if (!cell.classList.contains('x') || !cell.classList.contains('circle')){
                if(game.board.classList.contains(game.currentMark)){
                    cell.classList.add(game.currentMark)
                }
            }

            //check for win 
            if(game.checkWin(game.currentMark)){
                game.triggerGameOverScreen('win')
            }
            //check for draw
            else if(game.checkDraw()){
                game.triggerGameOverScreen('draw')
            }
        },

        swapPlayer: function(){
            if (this.currentMark === "x"){
                this.currentMark = "circle"
            } else {
                this.currentMark = "x" 
            }
        },

        updateBoardClass: function() {
            game.board.classList.remove("x")
            game.board.classList.remove("circle")
            game.board.classList.add(this.currentMark)
        },

        checkWin: function(currentMark){
            return game.WIN_COMBINATIONS.some(combo => {
                return combo.every(index => {
                    return game.cells[index].classList.contains(currentMark) 
                })
            })
        },

        checkDraw: function(){
            return [...game.cells].every(cell => cell.classList.contains('x')|| cell.classList.contains('circle'))
        },

        triggerGameOverScreen: function(option){
            game.winScreen.classList.toggle("visible")
            const restartButton = document.querySelector(".restart-btn")
            const gameOverMsg = document.querySelector('.win-text')
            game.connectButton(restartButton, game.restartGame)

            option === 'win' ? gameOverMsg.textContent = `${this.currentMark} wins!`
            : gameOverMsg.textContent = 'Draw!'
        },

        connectButton(button, func){
            button.addEventListener("click", func)
        },

        restartGame: function(){
            game.startGame()
        }, 
    }
    
    game.init()
}())