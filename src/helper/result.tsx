export class ResultBuilder<T> {
  value: T | null = null;
  error: string = "";

  setValue(value: T) {
    this.value = value;
    return this;
  }

  setError(error: string) {
    this.error = error;
    return this;
  }
}
