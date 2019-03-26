package com.tuo.gitproject.entity.xtsz.vo;


import com.tuo.gitproject.entity.xtsz.Syslog;

public class LogVo extends Syslog {
	
	private String oprUserName ;
	private String oprOrgName ;
	
	public String getOprUserName() {
		return oprUserName;
	}
	public void setOprUserName(String oprUserName) {
		this.oprUserName = oprUserName;
	}
	public String getOprOrgName() {
		return oprOrgName;
	}
	public void setOprOrgName(String oprOrgName) {
		this.oprOrgName = oprOrgName;
	}
}
