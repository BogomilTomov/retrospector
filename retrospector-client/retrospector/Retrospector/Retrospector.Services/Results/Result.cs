namespace Retrospector.Services.Results
{
    public class Result
    {
        public Result(string message, bool success)
        {
            Message = message;
            Success = success;
        }

        public string Message { get; set; }

        public bool Success { get; set; }
    }
}