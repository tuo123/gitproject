package com.tuo.gitproject.entity.xtsz;

import java.util.ArrayList;
import java.util.List;

public class Menu{
	
	public Menu() {}
	
	public Menu(String menuname, String menualias, String menuurl, Integer menuorder, String parentguid,
			String systype) {
		super();
		this.menuname = menuname;
		this.menualias = menualias;
		this.menuurl = menuurl;
		this.menuorder = menuorder;
		this.parentguid = parentguid;
	}
	
    private String menuname;

    private String menualias;

    private String menuurl;

    private Integer menuorder;

    private String parentguid;

    private String iconclass;

    private String isvisible;

    private Menu parentMenu;
    
    private List<Menu> childrenMenu = new ArrayList<Menu>(0);

    private List<Function> funcList = new ArrayList<Function>(0);
    
    public String getMenuname() {
        return menuname;
    }

    public void setMenuname(String menuname) {
        this.menuname = menuname;
    }

    public String getMenualias() {
        return menualias;
    }

    public void setMenualias(String menualias) {
        this.menualias = menualias;
    }

    public String getMenuurl() {
        return menuurl;
    }

    public void setMenuurl(String menuurl) {
        this.menuurl = menuurl;
    }

    public Integer getMenuorder() {
        return menuorder;
    }

    public void setMenuorder(Integer menuorder) {
        this.menuorder = menuorder;
    }

    public String getParentguid() {
        return parentguid;
    }

    public void setParentguid(String parentguid) {
        this.parentguid = parentguid;
    }

    public String getIconclass() {
        return iconclass;
    }

    public void setIconclass(String iconclass) {
        this.iconclass = iconclass;
    }

    public String getIsvisible() {
        return isvisible;
    }

    public void setIsvisible(String isvisible) {
        this.isvisible = isvisible;
    }
    
	public Menu getParentMenu() {
		return parentMenu;
	}

	public void setParentMenu(Menu parentMenu) {
		this.parentMenu = parentMenu;
	}

	public List<Menu> getChildrenMenu() {
		return childrenMenu;
	}

	public void setChildrenMenu(List<Menu> childrenMenu) {
		this.childrenMenu = childrenMenu;
	}

	public List<Function> getFuncList() {
		return funcList;
	}

	public void setFuncList(List<Function> funcList) {
		this.funcList = funcList;
	}
}