var e,r=(e=require("magic-string"))&&"object"==typeof e&&"default"in e?e.default:e,n=/^#!.*/;module.exports=function(){var e={};return{name:"rollup-plugin-preserve-shebangs",transform:function(r,a){var u=r.match(n);return u&&(e[a]=u[0]),{code:r=r.replace(n,""),map:null}},renderChunk:function(n,a,u){var t=u.sourcemap;if(a.facadeModuleId&&e[a.facadeModuleId]){var d=new r(n);return d.prepend(e[a.facadeModuleId]+"\n"),{code:d.toString(),map:t?d.generateMap({hires:!0}):null}}return{code:n,map:null}}}};
//# sourceMappingURL=shebang.js.map
