window.addEventListener('load', () => {
  function element(tag, attributes) {
    const element = document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (const attribute in attributes) {
      element.setAttribute(attribute, attributes[attribute]);
    }

    return element;
  }

  function rect(attributes) {
    return element('rect', attributes);
  }

  function ellipse(attributes) {
    return element('ellipse', attributes);
  }

  const fill = { fill: 'none' };
  const stroke = { stroke: '#333', };
  const strokeWidth = { 'stroke-width': '.25mm' };
  const fillAndStroke = { ...fill, ...stroke, ...strokeWidth };
  const roundBorder = { rx: '1mm', ...fillAndStroke };

  function button(x, y) {
    return [
      rect({ x: `${x}mm`, y: `${y}mm`, width: '1.5cm', height: '1.5cm', ...roundBorder }),
      ellipse({ cx: `${x + 7.5}mm`, cy: `${y + 7.5}mm`, rx: '5mm', ry: '5mm', stroke: '#aaa', ...fill, ...strokeWidth }),
    ];
  }

  function encoder(number) {
    // TODO: Make round and rotated
    const slit = rect({ x: `${128 + number * 31.05 + 15.7 - 3.5}mm`, y: `${4 + 15.7 - 1}mm`, width: '7mm', height: '2mm', ...roundBorder });
    let angle = Math.random() * 360;
    let speed = (Math.random() - .5) * 2;
    window.setInterval(() => {
      angle += speed;
      slit.style = `transform-box: fill-box; transform-origin: center; transform: rotate(${angle}deg);`
    });

    // https://www.schemecolor.com/rainbow-pastels-color-scheme.php
    const color = ['#C7CEEA', '#B5EAD7', 'white', '#FFB7B2'][number];
    return [
      rect({ x: `${128 + number * 31.05}mm`, y: '4mm', width: '3.05cm', height: '3.05cm', ...roundBorder }),
      ellipse({ cx: `${128 + number * 31.05 + 15.7}mm`, cy: '19.7mm', rx: '9mm', ry: '9mm', stroke: '#aaa', ...fill, ...strokeWidth }),
      ellipse({ cx: `${128 + number * 31.05 + 15.7}mm`, cy: '19.7mm', rx: '5mm', ry: '5mm', stroke: '#aaa', fill: color, ...strokeWidth }),
      slit,
    ];
  }

  const svg = element('svg', { width: '28.45cm', height: '10.15cm' });
  document.body.append(svg);

  svg.append(rect({ x: '.1mm', y: '.1mm', width: '28.25cm', height: '9.95cm', rx: '4mm', fill: '#eee', stroke: '#222', 'stroke-width': '.1mm' }));

  // Speaker
  svg.append(rect({ x: '4mm', y: '4mm', width: '3.05cm', height: '3.05cm', ...roundBorder }));
  for (let x = 0; x < 13; x++) {
    for (let y = 0; y < 13; y++) {
      if ((x === 0 || x === 12) && (y < 3 || y > 9) || (y === 0 || y === 12) && (x < 3 || x > 9)) {
        continue;
      }

      svg.append(ellipse({ cx: `${8 + x * 1.9}mm`, cy: `${8 + y * 1.9}mm`, rx: '.5mm', ry: '.5mm', fill: '#333', ...stroke, ...strokeWidth }));
    }
  }

  // Controls side speaker
  svg.append(rect({ x: '35mm', y: '4mm', width: '3.05cm', height: '1.5cm', ...roundBorder }));
  svg.append(ellipse({ cx: '42.5mm', cy: '11.5mm', rx: '5mm', ry: '5mm', stroke: '#aaa', ...fill, ...strokeWidth }));
  svg.append(ellipse({ cx: '44.5mm', cy: '13.5mm', rx: '1mm', ry: '1mm', stroke: '#aaa', ...fill, ...strokeWidth }));
  svg.append(...button(35, 19.5));
  svg.append(...button(50.5, 19.5));

  // Display
  svg.append(rect({ x: '66.4mm', y: '4.3mm', width: '60.7mm', height: '2.98cm', rx: '1mm', stroke: '#000', 'stroke-width': '1mm', fill: '#333' }));
  const displayText = element('text', { x: '96.75mm', y: '22mm', 'text-anchor': 'middle', fill: '#eee', 'font-size': '6mm', 'font-family': 'sans-serif' });
  displayText.textContent = '😍 SVG OP-1 🎛️';
  svg.append(displayText);

  // Encoders
  svg.append(...encoder(0));
  svg.append(...encoder(1));
  svg.append(...encoder(2));
  svg.append(...encoder(3));

  // Controls side encoders
  svg.append(...button(252, 19.5));
  svg.append(...button(252, 4));

  // Row above keyboard
  for (let index = 0; index < 17; index++) {
    svg.append(...button(4 + index * 15.5, 35));
  }

  // Columns side keyboard
  for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 3; y++) {
      svg.append(...button(4 + x * 15.5, 50.5 + y * 15.5));
    }
  }

  // Black keys
  const dots = [10, 2.5, 2.5, 10, 2.5, 10, 2.5, 2.5, 10, 2.5];
  const keys = [23, 15, 23, 23, 23, 23, 15, 23, 23, 23];
  const space = .3;
  for (let index = 0; index < 10; index++) {
    const x = 50.5 + keys.slice(0, index).reduce((a, c) => a + c + space, 0);
    const width = `${[...keys, ...keys][index] - space}mm`;
    svg.append(rect({ x: `${x}mm`, y: '50.5mm', width, height: '1.5cm', ...roundBorder }));
    svg.append(ellipse({ cx: `${x + 5 + dots[index]}mm`, cy: '58mm', rx: '5mm', ry: '5mm', fill: '#333', ...stroke }));
  }

  // White keys
  for (let index = 0; index < 14; index++) {
    // TODO: Add round oval shapes
    svg.append(rect({ x: `${50.5 + index * 15.5}mm`, y: '66mm', width: '1.5cm', height: '3.05cm', ...roundBorder }));
  }

  // Mic
  svg.append(ellipse({ cx: '275.5mm', cy: '11mm', rx: '.5mm', ry: '.5mm', fill: '#333', ...stroke, ...strokeWidth }));
  svg.append(ellipse({ cx: '277.5mm', cy: '11mm', rx: '.5mm', ry: '.5mm', fill: '#333', ...stroke, ...strokeWidth }));
  svg.append(ellipse({ cx: '275.5mm', cy: '13mm', rx: '.5mm', ry: '.5mm', fill: '#333', ...stroke, ...strokeWidth }));
  svg.append(ellipse({ cx: '277.5mm', cy: '13mm', rx: '.5mm', ry: '.5mm', fill: '#333', ...stroke, ...strokeWidth }));

  // Volume
  svg.append(ellipse({ cx: '276.5mm', cy: '37mm', rx: '.5mm', ry: '.5mm', fill: 'red', ...stroke, ...strokeWidth }));
  svg.append(ellipse({ cx: '276.5mm', cy: '39mm', rx: '.5mm', ry: '.5mm', fill: 'lime', ...stroke, ...strokeWidth }));
  svg.append(ellipse({ cx: '276.5mm', cy: '41mm', rx: '.5mm', ry: '.5mm', fill: 'lime', ...stroke, ...strokeWidth }));
  svg.append(ellipse({ cx: '276.5mm', cy: '43mm', rx: '.5mm', ry: '.5mm', fill: 'lime', ...stroke, ...strokeWidth }));
  svg.append(ellipse({ cx: '276.5mm', cy: '45mm', rx: '.5mm', ry: '.5mm', fill: 'lime', ...stroke, ...strokeWidth }));

  const text = element('text', { x: '27.75cm', y: '74mm', fill: '#666', 'font-size': '6mm', style: 'font-family: sans-serif; writing-mode: sideways-lr;' });
  text.textContent = 'OP-1';
  svg.append(text);

  const downloadButton = document.getElementById('downloadButton');
  downloadButton.addEventListener('click', () => {
    const text = svg.outerHTML.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"').replace(/>/g, '>\n');
    const a = document.createElement('a');
    a.download = 'op-1.svg';
    a.href = `data:image/svg+xml,` + encodeURIComponent(text);
    a.click();
  });
});
