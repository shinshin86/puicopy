const ORIGINAL_BUTTON_TEXT = "生成情報をコピー";
const COPYED_BUTTON_TEXT = "コピー完了！";

const div = document.createElement("div");
div.style.borderStyle = "solid";
div.style.borderWidth = "0";
div.style.boxSizing = "border-box";

const button = document.createElement("button");
button.innerHTML = ORIGINAL_BUTTON_TEXT;
button.style.alignItems = "center";
button.style.border = "1px solid #eaeae9";
button.style.display = "flex";
button.style.height = "40px";
button.style.padding = "6px 11px";
button.style.font = "#2c2d25";
button.style.display = "inline-block";
button.style.fontSize = "14px";
button.style.fontWeight = "700";

div.appendChild(button);

// copy to clipboard
button.addEventListener("click", () => {
  const promptFields = document.querySelectorAll(
    ".image-posts-detail__prompt-body",
  );
  const prompt = promptFields[0]?.textContent?.trim() || "";
  const negativePrompt = promptFields[1]?.textContent?.trim() || "";

  const parameters = document.querySelectorAll(
    ".image-posts-detail__prompt-parameter-value",
  );
  const steps = parameters[0]?.textContent;
  const scale = parameters[1]?.textContent;
  const seed = parameters[2]?.textContent;
  const sampler = parameters[3]?.textContent;
  const strength = parameters[4]?.textContent;
  const noise = parameters[5]?.textContent;

  let copyText = prompt || "";

  if (negativePrompt && negativePrompt !== "入力なし") {
    if (copyText) {
      copyText += "\n";
    }

    copyText += "Negative prompt: " + negativePrompt;
  }

  if (copyText && (steps || scale || seed || sampler || strength || noise)) {
    copyText += "\n";
  }

  if (steps) {
    copyText += "Steps: " + steps + ", ";
  }

  if (scale) {
    copyText += "CFG scale: " + scale + ", ";
  }

  if (seed) {
    copyText += "Seed: " + seed + ", ";
  }

  if (sampler) {
    copyText += "Sampler: " + sampler + ", ";
  }

  if (strength) {
    // TODO
  }

  if (noise) {
    // TODO
  }

  navigator.clipboard.writeText(copyText).then(() => {
    button.innerText = COPYED_BUTTON_TEXT;
    setTimeout(() => {
      button.innerText = ORIGINAL_BUTTON_TEXT;
    }, 1000);
  }).catch((err) => {
    console.error("Failed to copy text: ", err);
  });
});

const targetSelector = ".image-posts-detail__actions";
const taregtDiv = document.querySelector(targetSelector);

if (taregtDiv?.firstChild) {
  taregtDiv.insertBefore(div, taregtDiv.firstChild);
} else if (taregtDiv) {
  taregtDiv.appendChild(div);
}
