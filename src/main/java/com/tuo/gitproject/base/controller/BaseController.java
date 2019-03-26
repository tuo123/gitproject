package com.tuo.gitproject.base.controller;


import com.tuo.gitproject.entity.xtsz.User;
import com.tuo.gitproject.util.string.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Value;

import javax.servlet.http.HttpServletResponse;
import java.io.*;



public class BaseController {

	@Value("${temppath}")
	protected String temppath;

	@Value("${uploadFilePath}")
	protected String uploadFilePath;

	@Value("${sysguid}")
	protected String sysguid;

	protected User getCurrentUser() {
		return (User) SecurityUtils.getSubject().getPrincipal();
	}

	private String pathPrefix = StringUtils.Empty;

	protected void setPathPrefix(String pathPrefix) {
		this.pathPrefix = pathPrefix;
	}

	protected String getTemppath(String vm) {
		return this.temppath + vm;
	}

	/**
	 * 使用前请先设置 pathPrefix 根据设置 路径的前缀拼接 视图路径
	 * 
	 * @param vn
	 *            文件名
	 */
	protected String vn(String vn) {
		return this.pathPrefix + "/" + vn;
	}

	/**
	 * 下载文件本地文件的方法
	 * 
	 * @param response
	 *            响应流
	 * @param outFileName
	 *            下载文件名
	 * @param fileName
	 *            文件虚拟路径
	 * @param isdelete
	 *            下载完成后是否删除文件
	 * @throws Exception
	 */
	protected void download(HttpServletResponse response, String outFileName, String fileName, boolean isdelete,
                            boolean isExport) throws Exception {
		response.setContentType("text/html;charset=utf-8");
		response.setHeader("content-disposition",
				"attachment;filename=" + java.net.URLEncoder.encode(outFileName, "utf-8"));
		String rootPath = StringUtils.isNotEmpty(this.uploadFilePath) ? this.uploadFilePath
				: (System.getProperty("user.dir") + File.separator + "upload");
		if (isExport)
			rootPath = this.getTemppath("/");
		String fullPath = rootPath + fileName;
		File downFile = new File(fullPath);
		if (downFile.exists()) {
			OutputStream os = response.getOutputStream();
			BufferedInputStream in = new BufferedInputStream(new FileInputStream(downFile));
			int len;
			byte[] buf = new byte[4096];
			while ((len = in.read(buf)) != -1) {
				os.write(buf, 0, len);
			}
			os.flush();
			os.close();
			in.close();
			if (isdelete) {
				downFile.delete();
			}
		}
	}




}
