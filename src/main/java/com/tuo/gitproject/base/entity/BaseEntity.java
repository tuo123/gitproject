package com.tuo.gitproject.base.entity;

import java.util.Date;

public class BaseEntity implements IBaseEntity{

	private String guid;
	private String isenabled;
	
	private String lrr;
    private Date lrsj;
    private String gxr;
    private Date gxsj;
    private String scr; 
    private Date scsj; 
    private String scbs;
    
	public String getGuid() {
		return guid;
	}

	public void setGuid(String guid) {
		this.guid = guid;
	}

	public String getIsenabled() {
		return isenabled;
	}

	public void setIsenabled(String isenabled) {
		this.isenabled = isenabled;
	}

	public Date getGxsj() {
		return gxsj;
	}

	public void setGxsj(Date gxsj) {
		this.gxsj = gxsj;
	}

	public String getLrr() {
		return lrr;
	}

	public void setLrr(String lrr) {
		this.lrr = lrr;
	}

	public Date getLrsj() {
		return lrsj;
	}

	public void setLrsj(Date lrsj) {
		this.lrsj = lrsj;
	}

	public String getGxr() {
		return gxr;
	}

	public void setGxr(String gxr) {
		this.gxr = gxr;
	}
	
	public String getScr() {
		return scr;
	}

	public void setScr(String scr) {
		this.scr = scr;
	}

	public Date getScsj() {
		return scsj;
	}

	public void setScsj(Date date) {
		this.scsj = date;
	}

	public String getScbs() {
		return scbs;
	}

	public void setScbs(String scbs) {
		this.scbs = scbs;
	}
}
