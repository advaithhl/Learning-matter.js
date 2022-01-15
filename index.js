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
  });

  // makes canvas as big as the window
  render.canvas.width = document.documentElement.clientWidth;
  render.canvas.height = document.documentElement.clientHeight;

  const circle_radius = 20;
  // add a circle and rectangle
  var circle = Bodies.circle(100, 300, circle_radius);
  Body.setStatic(circle, true);

  // add all of the bodies to the world
  Composite.add(engine.world, [circle]);

  // run the renderer
  Render.run(render);

  // create runner
  var runner = Runner.create();

  // run the engine
  Runner.run(runner, engine);
});
