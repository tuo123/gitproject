package com.tuo.gitproject.entity.xtsz;

import java.util.Date;

public class Syslog{
    private String opruser;

    private String oprcontent;

    private String opripadress;

    private Date oprdate;

    public String getOpruser() {
        return opruser;
    }

    public void setOpruser(String opruser) {
        this.opruser = opruser;
    }

    public String getOprcontent() {
        return oprcontent;
    }

    public void setOprcontent(String oprcontent) {
        this.oprcontent = oprcontent;
    }

    public String getOpripadress() {
        return opripadress;
    }

    public void setOpripadress(String opripadress) {
        this.opripadress = opripadress;
    }

    public Date getOprdate() {
        return oprdate;
    }

    public void setOprdate(Date oprdate) {
        this.oprdate = oprdate;
    }
}