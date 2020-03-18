namespace Retrospector.Services.Results
{
    public class ResultData<T> : Result
    {
        public ResultData(string message, bool success) 
            : base(message, success)
        {

        }

        public ResultData(string message, bool success, T data) 
            : base(message, success)
        {
            Data = data;
        }

        public T Data { get; set; }
    }
}