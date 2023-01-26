using Api.Models;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.IO;

namespace Api.Contollers;

[ApiController]
[Route("api/[controller]")]
public class MilkController : ControllerBase
{
    readonly MilkCount? _milklist;
    const string path = "C:/Users/danil/study/milk/bend/milk.json";

    public MilkController()
    {
        _milklist = JsonSerializer.Deserialize<MilkCount>(System.IO.File.ReadAllText(path));
    }
    [HttpGet]
    public ActionResult<MilkCount> GetAllMilk()
    {
        if (_milklist != null){
            return _milklist;
        }
        return NotFound();
    }

    [HttpGet("{id}")]
    public ActionResult<Milk> GetMilk(string id)
    {
        var milk = _milklist?.results?.FirstOrDefault(m => m.id == id);
        if (milk == null)
        {
            return NotFound();
        }

        return milk;
    }

}