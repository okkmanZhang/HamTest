using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace AspnetCoreApi.EF
{
    [Table("Person")]
    public class Person{
        public int PersonId {get; set;}
        public string Name {get; set;}
        public int GradeId {get; set;}

        public virtual  Grade Grade {get; set;}
    }
}