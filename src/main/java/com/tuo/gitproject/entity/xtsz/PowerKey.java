package com.tuo.gitproject.entity.xtsz;

public class PowerKey {
	
	public PowerKey() {
		super();
	}

	public PowerKey(String roleguid, String powername) {
		super();
		this.roleguid = roleguid;
		this.powername = powername;
	}
	
    private String roleguid;

    private String powername;

    public String getRoleguid() {
        return roleguid;
    }

    public void setRoleguid(String roleguid) {
        this.roleguid = roleguid;
    }

    public String getPowername() {
        return powername;
    }

    public void setPowername(String powername) {
        this.powername = powername;
    }
}