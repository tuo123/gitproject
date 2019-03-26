package com.tuo.gitproject.service.user;
import com.tuo.gitproject.util.result.Result;
import com.tuo.gitproject.util.result.ResultMsg;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
@Service
public class UserServiceImpl  {

	@Transactional
	public ResultMsg login(String username, String password) {

			return Result.fail("用户不存在！");

	}









}
