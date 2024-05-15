module.exports = function override(config, env) {
  // 添加对 LESS 文件的支持
  config.module.rules.push({
    test: /\.less$/,
    use: [
      'style-loader',
      'css-loader',
      'less-loader',
    ],
  });
  return config;
};