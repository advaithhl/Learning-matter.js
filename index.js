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
              x: sign * (bodyA.position.x - bodyB.position.x) * 5e-8,
              y: sign * (bodyA.position.y - bodyB.position.y) * 5e-8,
            };
          },
        ],
      },
    }
  );
  // the attractor body must be added to the world before anything else.
  Composite.add(engine.world, circle);

  const w = render.canvas.width;
  const h = render.canvas.height;

  const centerH = w / 2;
  const centerK = h / 2;

  const orbital_radius = 200;

  console.log(w, h);

  const getX = (Y) =>
    centerH - Math.sqrt(orbital_radius ** 2 - (Y - centerK) ** 2);
  const getY = (X) =>
    centerK - Math.sqrt(orbital_radius ** 2 - (X - centerH) ** 2);

  const positions = [
    w * 0.38,
    w * 0.4,
    w * 0.45,
    w * 0.5,
    w * 0.55,
    w * 0.6,
    w * 0.62,
  ];

  for (var i = 0; i < positions.length; i += 1) {
    x_pos = positions[i];
    y_pos = getY(x_pos);
    console.log(`Body ${i} X: ${x_pos}, Y: ${y_pos}`);
    var body = Bodies.circle(
      x_pos,
      y_pos,
      10
    );
    Composite.add(engine.world, body);
  }

  // var circle2 = Bodies.circle(
  //   render.canvas.width / 2,
  //   render.canvas.height * 0.2,
  //   10,
  //   {
  //     render: {
  //       fillStyle: "#FF5733",
  //     },
  //     restitution: 0.8,
  //   }
  // );
  // Composite.add(engine.world, circle2);

  var height = document.documentElement.clientHeight;
  var width = document.documentElement.clientWidth;
  var ground = Bodies.rectangle(width / 2, height, width - 30, 60);
  Body.setStatic(ground, true);

  // add all of the bodies to the world

  setTimeout(() => {
    Matter.Sleeping.set(circle, false);
    sign = -1;
    console.log("timeout triggered");
  }, 5000);

  setTimeout(() => {
    // Matter.Sleeping.set(circle, false);
    sign = 0;
    console.log("second timeout triggered");
  }, 6500);

  // run the renderer
  Render.run(render);

  // create runner
  var runner = Runner.create();

  // run the engine
  Runner.run(runner, engine);
});
