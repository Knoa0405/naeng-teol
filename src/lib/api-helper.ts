import { isProduction } from "@/constants";
import ky, { HTTPError } from "ky";

export const api = ky.create({
  prefixUrl: isProduction
    ? process.env.API_BASE_URL_PROD
    : process.env.API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  hooks: {
    beforeError: [
      async (error: HTTPError) => {
        const { response } = error;

        if (response) {
          error.name = "APIError";
          switch (response.status) {
            case 401:
              error.message = "인증이 필요합니다.";
              break;
            case 403:
              error.message = "접근 권한이 없습니다.";
              break;
            case 404:
              error.message = "요청하신 리소스를 찾을 수 없습니다.";
              break;
            case 429:
              error.message =
                "요청이 너무 많습니다. 잠시 후 다시 시도해주세요.";
              break;
            case 500:
              error.message = "서버 오류가 발생했습니다.";
              break;
            default:
              error.message = response.statusText;
              break;
          }
        }

        console.error("API Error:", error);

        return error;
      },
    ],
  },
  retry: {
    methods: ["get", "put", "post", "patch", "delete"],
    delay(attemptCount) {
      return Math.min(1000 * 2 ** attemptCount, 10000);
    },
  },
  timeout: 30000,
});
