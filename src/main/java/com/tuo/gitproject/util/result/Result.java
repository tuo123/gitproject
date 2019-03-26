package com.tuo.gitproject.util.result;


public abstract class Result{
	
	public final static ResultMsg succ() {
		return succ(PromptMsg.OPERATE_SUCC);
	}
	
	public final static ResultMsg succ(String msg) {
		return succ(1,msg);
	}
	
	public final static ResultMsg succ(int code,String msg) {
		return ResultMsg.result(true,msg).setCode(code);
	}
	
	public final static ResultMsg fail(){
		return fail(PromptMsg.OPERATE_FAIL);
	}
	
	public final static ResultMsg fail(String msg) {
		return fail(0,msg);
	}
	
	public final static ResultMsg fail(int code, String msg) {
		return ResultMsg.result(false,msg).setCode(code);
	}
	
	public final static ResultMsg error(){
		return error(PromptMsg.OPERATE_ERROR);
	}
	
	public final static ResultMsg error(String msg) {
		return error(-1,msg);
	}
	
	public final static ResultMsg error(int code,String msg) {
		return ResultMsg.result(code, msg).setSucc(false).setError(true);
	}
	
	public final static ResultMsg unauth() {
		return ResultMsg.result(false,PromptMsg.UNAUTH).setAuth(false).setCode(-1000);
	}
	
}
