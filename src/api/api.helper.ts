/* eslint-disable @typescript-eslint/ban-ts-comment */
export const getContentType = () => ({
   "Content-Type": "application/json",
});

// @ts-expect-error
export const errorCatch = (error): string => {
   const message = error?.response?.data?.message;

   return message
      ? typeof error.response.data.message === "object"
         ? message[0]
         : message
      : error.message;
};
