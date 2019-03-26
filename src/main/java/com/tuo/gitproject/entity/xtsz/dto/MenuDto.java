package com.tuo.gitproject.entity.xtsz.dto;

public class MenuDto {
	
	private String guid;
	private String parentGuid;
	private String isenabled;
	private String isvisible;
	private String systype;
	
	public MenuDto() {}
	
	public MenuDto(String guid, String parentGuid, String isenabled, String isvisible) {
		super();
		this.guid = guid;
		this.parentGuid = parentGuid;
		this.isenabled = isenabled;
		this.isvisible = isvisible;
	}
	
	public String getGuid() {
		return guid;
	}
	public MenuDto setGuid(String guid) {
		this.guid = guid;
		return this;
	}
	public String getParentGuid() {
		return parentGuid;
	}
	public void setParentGuid(String parentGuid) {
		this.parentGuid = parentGuid;
	}
	public String getIsenabled() {
		return isenabled;
	}
	public MenuDto setIsenabled(String isenabled) {
		this.isenabled = isenabled;
		return this;
	}
	public String getIsvisible() {
		return isvisible;
	}
	public MenuDto setIsvisible(String isvisible) {
		this.isvisible = isvisible;
		return this;
	}

	public String getSystype() {
		return systype;
	}

	public MenuDto setSystype(String systype) {
		this.systype = systype;
		return this;
	}
}
