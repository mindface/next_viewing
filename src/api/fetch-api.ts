import { TaskPremise } from '../models/TaskPremise'

export class FetchApi {
  public GetFetch<T>(path: string): Promise<never | T> {
    return fetch(path, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log('err | ', err)
      })
  }

  public PostFetch<T>(path: string, data: T) {
    return fetch(path, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log('err | ', err)
      })
  }

  public PutFetch<T>(path: string, data: T) {
    return fetch(path, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log('err | ', err)
      })
  }

  public DeleteFetch(path: string) {
    return fetch(path, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log('err | ', err)
      })
  }
}
