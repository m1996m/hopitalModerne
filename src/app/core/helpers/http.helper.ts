import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {inject, Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";

type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

@Injectable()
export class HttpHelper {
    private static http: HttpClient;

    constructor(private http: HttpClient) {
        HttpHelper.http = http;
    }

    request<T>(method: HttpMethod, endpoint: string, body?: any, queryParameters: { [key: string]: string } = {}) {
        let result: Observable<T>;
        const fullUrl = environment.API_BASE_URL + endpoint;

        const params = new HttpParams({fromObject: queryParameters});

        switch (method) {
            case "GET":
                result = HttpHelper.http.get<T>(fullUrl, {params});
                break;
            case "POST":
                result = HttpHelper.http.post<T>(fullUrl, body, {params});
                break;
            case "PATCH":
                result = HttpHelper.http.patch<T>(fullUrl, body, {params});
                break;
            case "DELETE":
                result = HttpHelper.http.delete<T>(fullUrl, {params});
                break;

            default:
                throw new Error(`Invalid HTTP method: ${method}`);
        }

        return result;
    }

}
