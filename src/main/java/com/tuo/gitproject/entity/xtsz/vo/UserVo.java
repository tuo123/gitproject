package com.tuo.gitproject.entity.xtsz.vo;


import com.tuo.gitproject.base.entity.IViewEntity;
import com.tuo.gitproject.entity.xtsz.Role;
import com.tuo.gitproject.entity.xtsz.User;

public class UserVo extends User implements IViewEntity {
	private String orgname;
	
	private String rolesStr;

	public String getOrgname() {
		return orgname;
	}
	public void setOrgname(String orgname) {
		this.orgname = orgname;
	}

	public String getRolesStr() {
		String str = "";
		for(Role role : super.getRoles()) {
			str += role.getRolename() + ",";
		}
		return str;
	}
}
