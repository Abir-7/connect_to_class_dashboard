export interface ApiResponse<T> {
  data?: {
    data: T;
    message: string;
    statusCode: number;
    success: boolean;
  };
  error?: {
    data: {
      success: boolean;
      message: string;
    };
  };
}
