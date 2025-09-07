export function hud_create(): HTMLDivElement[] {
  const hud = [];
  hud.push(hud_create_header());
  hud.push(hud_create_side_left());
  hud.push(hud_create_side_right());
  hud.push(hud_create_footer());
  return hud;
}

function hud_create_header(): HTMLDivElement {
  const header = document.createElement('div');
  header.classList.add('hud-header');

  const date = document.createElement('div');
  date.classList.add('hud-date');
  date.id = 'hud-date';

  const time = document.createElement('div');
  time.classList.add('hud-time');
  time.id = 'hud-time';

  const time_before = document.createElement('div');
  time_before.classList.add('hud-time');
  time_before.id = 'hud-time-before';
  time_before.innerHTML = `
    <i id="btn-time-slow-max" class="fa-solid fa-backward-fast btn-time"></i>
    &nbsp;
    <i id="btn-time-slow-single" class="fa-solid fa-backward-step btn-time"></i>
  `;

  const time_after = document.createElement('div');
  time_after.classList.add('hud-time');
  time_after.id = 'hud-time-after';
  time_after.innerHTML = `
    <i id="btn-time-fast-single" class="fa-solid fa-forward-step btn-time"></i>
    &nbsp;
    <i id="btn-time-fast-max" class="fa-solid fa-forward-fast btn-time"></i>
  `;

  const time_message = document.createElement('div');
  time_message.classList.add('hud-time-message');
  time_message.id = 'hud-time-message';

  date.appendChild(time_before);
  date.appendChild(time);
  date.appendChild(time_after);
  date.appendChild(time_message);
  header.appendChild(date);

  return header;
}

function hud_create_footer(): HTMLDivElement {
  const footer = document.createElement('div');
  footer.classList.add('hud-footer');
  return footer;
}

function hud_create_side_left(): HTMLDivElement {
  const side_left = document.createElement('div');
  side_left.classList.add('hud-side-left');
  return side_left;
}

function hud_create_side_right(): HTMLDivElement {
  const side_right = document.createElement('div');
  side_right.classList.add('hud-side-right');
  return side_right;
}