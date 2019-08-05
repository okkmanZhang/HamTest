using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace AspnetCoreApi.EF{
    [Table("Grade")]
    public class Grade{
        public int GradeId {get; set;}
        public string Name {get; set;}

        public virtual  ICollection<Person> Persons {get; set;}
    }
}