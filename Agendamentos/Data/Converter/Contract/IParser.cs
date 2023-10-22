namespace Agendamentos.Data.Converter.Contract
{
    public interface IParser<O, D>
    {
        D Parser(O origem);

        List<D> Parse(List<O> origem);
    }
}
