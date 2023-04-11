// Icons
const icon_done =
  "<svg xmlns='http://www.w3.org/2000/svg' height='48' width='48' viewBox='0 96 960 960'><path d='m421 758 283-283-46-45-237 237-120-120-45 45 165 166Zm59 218q-82 0-155-31.5t-127.5-86Q143 804 111.5 731T80 576q0-83 31.5-156t86-127Q252 239 325 207.5T480 176q83 0 156 31.5T763 293q54 54 85.5 127T880 576q0 82-31.5 155T763 858.5q-54 54.5-127 86T480 976Zm0-60q142 0 241-99.5T820 576q0-142-99-241t-241-99q-141 0-240.5 99T140 576q0 141 99.5 240.5T480 916Zm0-340Z' /></svg>";

const icon_error =
  "<svg xmlns='http://www.w3.org/2000/svg' height='48' width='48' viewBox='0 96 960 960'><path d='M479.982 776q14.018 0 23.518-9.482 9.5-9.483 9.5-23.5 0-14.018-9.482-23.518-9.483-9.5-23.5-9.5-14.018 0-23.518 9.482-9.5 9.483-9.5 23.5 0 14.018 9.482 23.518 9.483 9.5 23.5 9.5ZM453 623h60V370h-60v253Zm27.266 353q-82.734 0-155.5-31.5t-127.266-86q-54.5-54.5-86-127.341Q80 658.319 80 575.5q0-82.819 31.5-155.659Q143 347 197.5 293t127.341-85.5Q397.681 176 480.5 176q82.819 0 155.659 31.5Q709 239 763 293t85.5 127Q880 493 880 575.734q0 82.734-31.5 155.5T763 858.316q-54 54.316-127 86Q563 976 480.266 976Zm.234-60Q622 916 721 816.5t99-241Q820 434 721.188 335 622.375 236 480 236q-141 0-240.5 98.812Q140 433.625 140 576q0 141 99.5 240.5t241 99.5Zm-.5-340Z' /></svg>";

// Methods
const useNotify = (message: string, type: string) => {
  const timeout = 5000;
  const tick = 10;

  const container = document.createElement("section");
  container.id = "notify";
  container.className = `notify notify-${type}`;

  const icon = document.createElement("i");
  icon.className = "notify-icon";
  if (type === "done") {
    icon.innerHTML = icon_done;
  }
  if (type === "error") {
    icon.innerHTML = icon_error;
  }
  container.appendChild(icon);

  const content = document.createTextNode(message);
  const textcontainer = document.createElement("span");
  textcontainer.appendChild(content);
  container.appendChild(textcontainer);

  document.body.appendChild(container);

  let container_width = container.offsetWidth - 6;
  const container_width_delta = container_width / (timeout / tick);
  const progressbar = document.createElement("span");
  progressbar.className = "notify-progress";
  progressbar.style.width = container_width + "px";
  container.appendChild(progressbar);

  let timerId = setInterval(() => {
    container_width = container_width - container_width_delta;
    progressbar.style.width = container_width + "px";
  }, tick);

  setTimeout(() => {
    clearInterval(timerId);
    container.remove();
  }, timeout);
};

// Export
export { useNotify };
