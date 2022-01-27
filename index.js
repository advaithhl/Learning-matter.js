window.addEventListener("load", () => {
  // module aliases
  var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Body = Matter.Body,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;

  // create an engine
  var engine = Engine.create();

  // create a renderer
  var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
      wireframes: false,
    },
  });

  // makes canvas as big as the window
  render.canvas.width = document.documentElement.clientWidth;
  render.canvas.height = document.documentElement.clientHeight;

  const circle_radius = 20;
  // add a circle and rectangle
  var circle = Bodies.circle(
    document.documentElement.clientWidth / 2,
    document.documentElement.clientHeight * 0.2,
    circle_radius
  );
  circle.restitution = 0.8;

  var height = document.documentElement.clientHeight;
  var width = document.documentElement.clientWidth;
  var ground = Bodies.rectangle(width / 2, height, width - 30, 60);
  Body.setStatic(ground, true);

  // add all of the bodies to the world
  Composite.add(engine.world, [circle, ground]);

  // run the renderer
  Render.run(render);

  // create runner
  var runner = Runner.create();

  // run the engine
  Runner.run(runner, engine);
});
