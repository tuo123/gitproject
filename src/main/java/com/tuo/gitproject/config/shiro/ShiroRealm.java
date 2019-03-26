package com.tuo.gitproject.config.shiro;


import com.tuo.gitproject.entity.xtsz.User;
import com.tuo.gitproject.service.user.UserServiceImpl;
import com.tuo.gitproject.util.result.ResultMsg;
import org.apache.shiro.authc.*;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.springframework.stereotype.Component;
import javax.annotation.Resource;
import java.util.HashSet;
import java.util.Set;

@Component
public class ShiroRealm extends AuthorizingRealm {

	@Resource
	private UserServiceImpl userService;

	@Override
	protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
		User u = (User) principals.fromRealm(getName()).iterator().next();
		Set<String> roleNames = new HashSet<String>();
		Set<String> permissions = new HashSet<String>();
		u.getRoles().stream().forEach(r -> {
			roleNames.add(r.getRolename());
			r.getPowers().stream().forEach(m -> {
				String powername = m.getPowername();
				if(!permissions.contains(powername)) {					
					permissions.add(powername);
				}
			});
		}); 
		SimpleAuthorizationInfo sai = new SimpleAuthorizationInfo();
		sai.setRoles(roleNames);
		sai.setStringPermissions(permissions);
		return sai;
	}

	@Override
	protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {
		UsernamePasswordToken shiroToken = (UsernamePasswordToken) token;
		
		String password = new String(shiroToken.getPassword());
	/*	if(Constants.WXXYMM.equals(password)) {
			WxYhgl wxYhgl = this.wxyhglService.get(shiroToken.getUsername());
			if(null == wxYhgl) {
				throw new AccountException("登录失败，请从菜单重进！");
			}
			return new SimpleAuthenticationInfo(wxYhgl, Constants.WXXYMM, getName());
		}else {
			ResultMsg res = userService.login(shiroToken.getUsername(), password);
			User u = (User) res.getData("user");
			if (!res.isSucc()) {
				throw new AccountException(res.getMsg());
			}
			return new SimpleAuthenticationInfo(u, u.getPassword(), getName());
		}*/
		
		
		ResultMsg res = userService.login(shiroToken.getUsername(), password);
		User u = (User) res.getData("user");
		if (!res.isSucc()) {
			throw new AccountException(res.getMsg());
		}
		return new SimpleAuthenticationInfo(u, u.getPassword(), getName());
		
		
	}

}
