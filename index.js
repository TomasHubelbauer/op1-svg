window.addEventListener('load', () => {
  const scale = 5;
  const margin = 10;

  const width = 282;
  const height = 102;

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', margin + width + margin);
  svg.setAttribute('height', margin + height + margin);
  svg.style.transform = `scale(${scale})`;
  svg.style.transformOrigin = '0 0';
  document.body.append(svg);

  function line(x1, y1, x2, y2) {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', x1);
    line.setAttribute('y1', y1);
    line.setAttribute('x2', x2);
    line.setAttribute('y2', y2);
    line.setAttribute('stroke', 'black');
    svg.append(line);
  }

  function path(g) {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', g);
    path.setAttribute('stroke', 'black');
    path.setAttribute('fill', 'none');
    svg.append(path);
  }

  // TODO: Make actually round
  function corner(x, y, size, orientation) {
    switch (orientation) {
      case 'bottom-left': {
        return path(`M ${x} ${y - size} c 0 ${size}, 0 ${size}, ${size} ${size}`);
      }
      case 'bottom-right': {
        return path(`M ${x - size} ${y} c ${size} 0, ${size} 0, ${size} ${-size}`);
      }
      case 'top-right': {
        return path(`M ${x} ${y + size} c 0 ${-size}, 0 ${-size}, ${-size} ${-size}`);
      }
      case 'top-left': {
        return path(`M ${x + size} ${y} c ${-size} 0, ${-size} 0, ${-size} ${size}`);
      }
    }

    throw new Error(`Invalid corner orientation ${orientation}.`);
  }

  function roundedRect(x, y, width, height, cornerSize) {
    line(x, y + cornerSize, x, y + height - cornerSize);
    corner(x, y + height, cornerSize, 'bottom-left');
    line(x + cornerSize, y + height, x + cornerSize + width - cornerSize * 2, y + height);
    corner(x + width, y + height, cornerSize, 'bottom-right');
    line(x + width, y + height - cornerSize, x + width, y + cornerSize);
    corner(x + width, y, cornerSize, 'top-right');
    line(x + cornerSize + width - cornerSize * 2, y, x + cornerSize, y);
    corner(x, y, cornerSize, 'top-left');
  }

  const cornerSize = 4;

  roundedRect(margin, margin, width, height, cornerSize);
  roundedRect(margin + cornerSize, margin + cornerSize, 263, height - cornerSize * 2, cornerSize / 2);

  roundedRect(margin + cornerSize + .5, margin + cornerSize + .5, 30.5, 30.5, cornerSize / 2);

  for (let index = 0; index < 17; index++) {
    roundedRect(margin + cornerSize + .5 + 15.5 * index, margin + cornerSize + 1 + 30.5 + .5, 15, 15, cornerSize / 2);
  }

  roundedRect(margin + cornerSize + .5, margin + cornerSize + 1 + 30.5 + .5 + 15 + .5, 15, 15, cornerSize / 2);
  roundedRect(margin + cornerSize + .5, margin + cornerSize + 1 + 30.5 + .5 + 15 + .5 + 15 + .5, 15, 15, cornerSize / 2);
  roundedRect(margin + cornerSize + .5, margin + cornerSize + 1 + 30.5 + .5 + 15 + .5 + 15 + .5 + 15 + .5, 15, 15, cornerSize / 2);

});
