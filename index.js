// load attractor module
Matter.use(
  "matter-attractors" // PLUGIN_NAME
);

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
  engine.world.gravity.scale = 0;

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

  let sign = 1;

  const circle_radius = 100;
  // add a circle and rectangle
  var circle = Bodies.circle(
    document.documentElement.clientWidth / 2,
    document.documentElement.clientHeight / 2,
    circle_radius,
    {
      render: {
        fillStyle: "#BBB2E9",
      },
      isStatic: true,

      plugin: {
        attractors: [
          function (bodyA, bodyB) {
            return {
              x: sign * (bodyA.position.x - bodyB.position.x) * 1e-6,
              y: sign * (bodyA.position.y - bodyB.position.y) * 1e-6,
            };
          },
        ],
      },
    }
  );
  // the attractor body must be added to the world before anything else.
  Composite.add(engine.world, circle);

  var circle2 = Bodies.circle(
    render.canvas.width / 4,
    render.canvas.height * 0.30,
    10,
    {
      render: {
        fillStyle: "#FF5733",
      },
      restitution: 0.8,
    }
  );
  Body.setVelocity(circle2, { x: 30, y: 0 });
  Composite.add(engine.world, circle2);

  // run the renderer
  Render.run(render);

  // create runner
  var runner = Runner.create();

  // run the engine
  Runner.run(runner, engine);
});
