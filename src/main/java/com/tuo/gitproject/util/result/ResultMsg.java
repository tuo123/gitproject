package com.tuo.gitproject.util.result;


import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;


public class ResultMsg implements Serializable {

	private static final long serialVersionUID = 1L;

	public ResultMsg() {
	}
	
	public ResultMsg(boolean isSucc,String msg) {
		this.isSucc = isSucc;
		this.msg = msg;
	}
	
	private boolean isSucc;
	private boolean isError;
	private boolean isAuth;
	private int code;
	private String msg;
	private Map<String, Object> data = new HashMap<String, Object>(0);

	public static ResultMsg result(boolean isSucc, String msg) {
		ResultMsg res = new ResultMsg();
		res.setSucc(isSucc)
		.setMsg(msg)
		.setAuth(true)
		.setError(false);
		return res;
	}

	public static ResultMsg result() {
		ResultMsg res = new ResultMsg();
		res.setSucc(true)
		.setAuth(true)
		.setMsg(PromptMsg.OPERATE_SUCC);
		return res;
	}

	public static ResultMsg result(int code, String msg) {
		ResultMsg res = new ResultMsg();
		res.setAuth(true)
		.setCode(code)
		.setMsg(msg);
		return res;
	}

	public boolean isSucc() {
		return isSucc;
	}

	public ResultMsg setSucc(boolean isSucc) {
		this.isSucc = isSucc;
		return this;
	}

	public boolean isError() {
		return isError;
	}

	public ResultMsg setError(boolean isError) {
		this.isError = isError;
		return this;
	}

	public String getMsg() {
		return msg;
	}

	public ResultMsg setMsg(String msg) {
		this.msg = msg;
		return this;
	}

	public ResultMsg setData(String key, Object value) {
		this.data.put(key, value);
		return this;
	}

	public ResultMsg setData(Map<String, Object> data) {
		this.data = data;
		return this;
	}

	public Map<String, Object> getData() {
		return data;
	}

	public Object getData(String key) {
		return this.data.get(key);
	}

	public boolean isAuth() {
		return isAuth;
	}

	public ResultMsg setAuth(boolean isAuth) {
		this.isAuth = isAuth;
		return this;
	}

	public int getCode() {
		return code;
	}

	public ResultMsg setCode(int code) {
		this.code = code;
		return this;
	}
}