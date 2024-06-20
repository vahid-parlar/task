using DAL.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Model
{
    public class MemberShipDto
    {
        public long ProjectId { get; set; }

        public string UserName { get; set; }

        public long ProjectRoleId { get; set; }

        public DateTime FromDate { get; set; }

        public DateTime? ToDate { get; set; }
    }
}
