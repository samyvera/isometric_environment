window.onload = () => {

    var controller = new KeyboardListener();
    var game = new Game();
    var display = new Display(game);

    var frame = () => {
        game.update(controller.keys);
        display.update();
        requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
}