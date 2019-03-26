package com.tuo.gitproject.entity.xtsz;

import java.util.ArrayList;
import java.util.List;

public class Role {
    private String rolename;

    private String rolealias;

    private List<Menu> menus = new ArrayList<Menu>();
    
    private List<PowerKey> powers = new ArrayList<PowerKey>(0);


    public String getRolename() {
        return rolename;
    }

    public void setRolename(String rolename) {
        this.rolename = rolename;
    }

    public String getRolealias() {
        return rolealias;
    }

    public void setRolealias(String rolealias) {
        this.rolealias = rolealias;
    }

	public List<Menu> getMenus() {
		return menus;
	}

	public void setMenus(List<Menu> menus) {
		this.menus = menus;
	}

	public List<PowerKey> getPowers() {
		return powers;
	}

	public void setPowers(List<PowerKey> powers) {
		this.powers = powers;
	}
}