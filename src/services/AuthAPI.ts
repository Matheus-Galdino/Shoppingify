import BaseService from "./BaseService";
import User from "@/models/User.interface";

export default class AuthAPI extends BaseService {
  static async Signup(user: User) {
    const body = JSON.stringify(user);

    const result = await fetch(`${this.API_URL}/user/signup`, {
      method: "POST",
      headers: this.defaultHeaders,
      body,
    });

    const json = await result.json();

    if (!result.ok) throw new Error(json.error);

    return json.token;
  }

  static async Signin(user: User, keepConnected: boolean) {
    const body = JSON.stringify(user);

    const result = await fetch(`${this.API_URL}/user/signin?keepConnected=${keepConnected}`, {
      method: "POST",
      headers: this.defaultHeaders,
      body,
    });

    const json = await result.json();

    if (!result.ok) throw new Error(json.error);

    return json;
  }

  static async getConnectedUser(userHash: string) {
    const result = await fetch(`${this.API_URL}/user/connected/${userHash}`);

    const json = await result.json();

    if (!result.ok) console.error(json.error);

    return json.token;
  }
}
