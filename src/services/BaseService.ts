export default abstract class BaseService {
  protected static API_URL = "https://localhost:44333/api";

  protected static defaultHeaders = {
    "Content-Type": "application/json",
  };
}
