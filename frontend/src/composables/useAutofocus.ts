// Methods
const useAutofocus = () => {
  setTimeout(() => {
    const element = document.getElementById("autofocus") as HTMLElement;
    if (element) {
      const input = element.firstChild as HTMLInputElement;
      if (input) {
        input.focus();
      }
    }
  }, 333);
};

// Export
export { useAutofocus };
