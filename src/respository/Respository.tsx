import { ResultBuilder } from "../helper/result";

interface Repository<T> {
  get(): Promise<ResultBuilder<T[]>>;
  getAll(): Promise<ResultBuilder<T[]>>;
  add(element: T): Promise<ResultBuilder<T>>;
  deleteById(id: string): Promise<ResultBuilder<T>>;
  updateById(id: string, element: T): Promise<ResultBuilder<T>>;
}

class RepositoryImpl<T> implements Repository<T> {
  protected URL = "";
  constructor(url: string) {
    this.URL = url;
  }

  async get(): Promise<ResultBuilder<T[]>> {
    const res = new ResultBuilder<T[]>();
    try {
      const response = await fetch(this.URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.status === 200) {
        return res.setValue(data.payload);
      }

      return res.setError(response.statusText);
    } catch (error) {
      return res.setError(error.message);
    }
  }

  async getAll(): Promise<ResultBuilder<T[]>> {
    const res = new ResultBuilder<T[]>();
    try {
      const response = await fetch(this.URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.status === 200) {
        return res.setValue(data.payload);
      }
      return res.setError(response.statusText);
    } catch (error) {
      return res.setError(error.message);
    }
  }
  async add(element: T): Promise<ResultBuilder<T>> {
    const res = new ResultBuilder<T>();
    try {
      const response = await fetch(this.URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(element),
      });
      const data = await response.json();
      if (response.status === 201) {
        return res.setValue(data.payload);
      }
      return res.setError(data.error);
    } catch (error) {
      return res.setError(error.message);
    }
  }

  async deleteById(id: string): Promise<ResultBuilder<T>> {
    const res = new ResultBuilder<T>();
    try {
      const response = await fetch(this.URL + "/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.status === 200) {
        return res.setValue(data.payload);
      }
      return res.setError(data.error);
    } catch (error) {
      return res.setError(error.message);
    }
  }

  async updateById(id: string, element: T): Promise<ResultBuilder<T>> {
    const res = new ResultBuilder<T>();
    try {
      const response = await fetch(this.URL + "/" + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(element),
      });

      const data = await response.json();
      if (response.status === 200) {
        return res.setValue(data.payload);
      }
      return res.setError(data.error);
    } catch (error) {
      return res.setError(error.message);
    }
  }
}
export { RepositoryImpl, Repository };
