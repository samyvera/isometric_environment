window.onload = () => {

    var controller = new KeyboardListener();
    var game = new Game(controller.keys);
    var display = new Display(game);

    var frame = () => {
        game.update();
        display.update();
        requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
}