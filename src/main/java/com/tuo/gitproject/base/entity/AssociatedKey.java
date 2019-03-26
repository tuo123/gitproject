/**
 * 
 */
package com.tuo.gitproject.base.entity;

import java.io.Serializable;

public class AssociatedKey implements Serializable{
	
	private String key1;
	private String key2;

	public AssociatedKey() {
		super();
	}
	public AssociatedKey(String key1, String key2) {
		super();
		this.key1 = key1;
		this.key2 = key2;
	}
	public String getKey1() {
		return key1;
	}
	public void setKey1(String key1) {
		this.key1 = key1;
	}
	public String getKey2() {
		return key2;
	}
	public void setKey2(String key2) {
		this.key2 = key2;
	}
}
