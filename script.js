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
            this.locateClicks()
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
                cell.addEventListener("click", function() {
                    game.placeMark(cell)
                    game.swapPlayer()
                    game.updateBoardClass()
                }, {once: true})
            })
        },

        startGame: function(){
            this.board.classList.add(this.currentMark)
        }, 

        placeMark: function(cell){
            if(game.board.classList.contains(game.currentMark)){
                cell.classList.add(game.currentMark)
            }

            //check for win 
            if(game.checkWin(game.currentMark)){
                game.triggerWinScreen()
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

        triggerWinScreen: function(){
            game.winScreen.classList.toggle("visible")
        },

        connectButton(button, func){
            button.addEventListener("click", func)
        },


    }
    
    game.init()
}())