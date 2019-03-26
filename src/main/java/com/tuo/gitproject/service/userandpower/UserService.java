package com.tuo.gitproject.service.userandpower;
import com.tuo.gitproject.entity.xtsz.User;
import com.tuo.gitproject.mapper.mysqlxinyin.userandpower.UserMapper;
import com.tuo.gitproject.util.result.Result;
import com.tuo.gitproject.util.result.ResultMsg;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
@Service
public class UserService {

	@Autowired
	private UserMapper userMapper;
	@Transactional
	public ResultMsg login(String username, String password) {
		User user = userMapper.findByUsername(username);
		if (null != user) {
			if (password.equals(user.getPassword())) {
				//if ("1".equals(user.getIsenabled())) {
					return Result.succ("登陆成功").setData("user", user);
				//} else {
					//return Result.fail("该用户被禁用，无法登陆！");
				//}
			} else {
				return Result.fail("登陆口令错误！");
			}
		} else {
			return Result.fail("用户不存在！");
		}

	}









}
