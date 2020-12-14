import {http} from "@voyo/http";
import {ticketKey,requestHost} from "@config";
http.setHost(requestHost);
http.setTicketKey(ticketKey);
/**
 * http全局结果预处理
 */
http.setAfterHandler(
  ({ result, retry }) =>
    new Promise((resolve, reject) => {
        const { content, status }: any = result;
        resolve(result);
        // if (
        //   status !== 200 ||
        //   (content &&
        //     content.code &&
        //     content.code !== 20000 &&
        //     typeof content.code == "number")
        // ) {
        //     if (
        //       status === 401 &&
        //       (content.code === 40102 || content.code === 40109)
        //     ) {
        //     } else {
        //         reject(content);
        //     }
        // } else {
        //     resolve(content && content.result ? content.result : content);
        // }
    }),
);
export {
    http
}
