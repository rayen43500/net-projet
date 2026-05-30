using Microsoft.AspNetCore.Mvc;

namespace Platform.Api.Controllers;

[ApiController]
[Route("api/uploads")]
public class UploadsController : ControllerBase
{
  private static readonly HashSet<string> AllowedImageTypes = new()
  {
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif"
  };

  private readonly IWebHostEnvironment _environment;

  public UploadsController(IWebHostEnvironment environment)
  {
    _environment = environment;
  }

  [HttpPost("images")]
  [RequestSizeLimit(5 * 1024 * 1024)]
  public async Task<IActionResult> UploadImage(IFormFile? file)
  {
    if (file == null || file.Length == 0)
    {
      return BadRequest("File is required");
    }

    if (!AllowedImageTypes.Contains(file.ContentType))
    {
      return BadRequest("Only JPG, PNG, WEBP and GIF images are allowed");
    }

    var webRoot = _environment.WebRootPath ?? Path.Combine(_environment.ContentRootPath, "wwwroot");
    var uploadRoot = Path.Combine(webRoot, "uploads");
    Directory.CreateDirectory(uploadRoot);

    var extension = Path.GetExtension(file.FileName);
    var fileName = $"{Guid.NewGuid():N}{extension}";
    var path = Path.Combine(uploadRoot, fileName);

    await using var stream = System.IO.File.Create(path);
    await file.CopyToAsync(stream);

    return Ok(new
    {
      url = $"/uploads/{fileName}",
      fileName,
      file.ContentType,
      file.Length
    });
  }
}
