__NUXT_JSONP__("/how-to-automatically-unseal-vault-server-for-free", (function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,_,$,aa,ab,ac,ad,ae,af,ag){return {data:[{}],fetch:{"Index:0":{article:{slug:"how-to-automatically-unseal-vault-server-for-free",description:"Deploy your CronJob with Helm to unseal your Vault server for free with Kubernetes.",title:"How to automatically unseal Vault Server for free",author:"hakan",category:O,tags:[P,"HashiCorp","server","cronjob",Q,"helm","chart",O,"k8s"],thumbnail:"3828944.jpg",isPublished:true,createdAt:"2021-04-07T00:00:00.000Z",toc:[{id:R,depth:o,text:S},{id:T,depth:o,text:U},{id:V,depth:o,text:W},{id:X,depth:o,text:Y},{id:Z,depth:o,text:_},{id:$,depth:o,text:aa},{id:ab,depth:o,text:ac}],body:{type:"root",children:[{type:b,tag:p,props:{id:R},children:[{type:b,tag:q,props:{ariaHidden:r,href:"#introduction",tabIndex:s},children:[{type:b,tag:c,props:{className:[t,u,v]},children:[]}]},{type:a,value:S}]},{type:a,value:e},{type:b,tag:g,props:{},children:[{type:a,value:"Vault is a very powerful secret manager tool from Hashicorp. It is widely used\nfor a different platform to store secrets. I run my Vault server in my\nKubernetes cluster deployed with Helm Chart. When the pod restarted, the Vault\nwill seal itself. You will need to unseal it to use. Vault introduces different\nalternatives to unseal it automatically. However, all of them require an extra\nfee. For this reason, I created a CLI tool to unseal your Vault server. In this\ntutorial, I will show you how to create a CronJob within a Kubernetes cluster to\nunseal your Vault server for free."}]},{type:a,value:e},{type:b,tag:p,props:{id:T},children:[{type:b,tag:q,props:{ariaHidden:r,href:"#prerequisites",tabIndex:s},children:[{type:b,tag:c,props:{className:[t,u,v]},children:[]}]},{type:a,value:U}]},{type:a,value:e},{type:b,tag:g,props:{},children:[{type:a,value:"Before you get started, you will need to have a number of things."}]},{type:a,value:e},{type:b,tag:"ol",props:{},children:[{type:a,value:e},{type:b,tag:A,props:{},children:[{type:a,value:"A running Kubernetes cluster."}]},{type:a,value:e},{type:b,tag:A,props:{},children:[{type:b,tag:f,props:{},children:[{type:a,value:ad}]},{type:a,value:" installed. If not, you will need it to manage your clusters."}]},{type:a,value:e},{type:b,tag:A,props:{},children:[{type:a,value:"Have a "},{type:b,tag:f,props:{},children:[{type:a,value:"KUBECONFIG"}]},{type:a,value:" file (default location is ~\u002F.kube\u002Fconfig)."}]},{type:a,value:e},{type:b,tag:A,props:{},children:[{type:a,value:"Helm v3."}]},{type:a,value:e}]},{type:a,value:e},{type:b,tag:p,props:{id:V},children:[{type:b,tag:q,props:{ariaHidden:r,href:"#vault-unseal-cli",tabIndex:s},children:[{type:b,tag:c,props:{className:[t,u,v]},children:[]}]},{type:a,value:W}]},{type:a,value:e},{type:b,tag:g,props:{},children:[{type:a,value:"Vault Unseal is a tool to allow you to unseal your Vault server in command line.\nIt accepts "},{type:b,tag:f,props:{},children:[{type:a,value:ae}]},{type:a,value:" and "},{type:b,tag:f,props:{},children:[{type:a,value:"shard"}]},{type:a,value:" parameters. If you Vault is sealed, it will use\nprovided shards to unseal it. If it is unsealed already, it will simply do\nnothing."}]},{type:a,value:e},{type:b,tag:k,props:{className:[l]},children:[{type:b,tag:m,props:{className:[n,w]},children:[{type:b,tag:f,props:{},children:[{type:a,value:"CLI "},{type:b,tag:c,props:{className:[d,B,C]},children:[{type:a,value:G}]},{type:a,value:" to automatically unseal Vault\n\nUsage:\n  vault-unseal "},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:"["}]},{type:a,value:G},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:"]"}]},{type:a,value:"\n\nAvailable Commands:\n  "},{type:b,tag:c,props:{className:[d,B,C]},children:[{type:a,value:af}]},{type:a,value:"        Help about any "},{type:b,tag:c,props:{className:[d,B,C]},children:[{type:a,value:G}]},{type:a,value:"\n  unseal      Unseal Vault.\n  version     Print the version\u002Fbuild number\n\nFlags:\n  -h, --help   "},{type:b,tag:c,props:{className:[d,B,C]},children:[{type:a,value:af}]},{type:a,value:i},{type:b,tag:c,props:{className:[d,H]},children:[{type:a,value:I}]},{type:a,value:" vault-unseal\n\nUse "},{type:b,tag:c,props:{className:[d,y]},children:[{type:a,value:"\"vault-unseal [command] --help\""}]},{type:a,value:i},{type:b,tag:c,props:{className:[d,H]},children:[{type:a,value:I}]},{type:a,value:i},{type:b,tag:c,props:{className:[d,D]},children:[{type:a,value:"more"}]},{type:a,value:" information about a command.\n"}]}]}]},{type:a,value:e},{type:b,tag:p,props:{id:X},children:[{type:b,tag:q,props:{ariaHidden:r,href:"#helm-repository",tabIndex:s},children:[{type:b,tag:c,props:{className:[t,u,v]},children:[]}]},{type:a,value:Y}]},{type:a,value:e},{type:b,tag:g,props:{},children:[{type:a,value:"We will use Vault Unseal helm chart to create Kubernetes Cron Job. For this,\nlet's add Helm Chart repository."}]},{type:a,value:e},{type:b,tag:k,props:{className:[l]},children:[{type:b,tag:m,props:{className:[n,w]},children:[{type:b,tag:f,props:{},children:[{type:a,value:"helm repo "},{type:b,tag:c,props:{className:[d,D]},children:[{type:a,value:"add"}]},{type:a,value:" omegion https:\u002F\u002Fcharts.omegion.dev\nhelm repo update\n"}]}]}]},{type:a,value:e},{type:b,tag:g,props:{},children:[{type:a,value:"Now, we have helm charts, let's look up the one that we want to install."}]},{type:a,value:e},{type:b,tag:k,props:{className:[l]},children:[{type:b,tag:m,props:{className:[n,w]},children:[{type:b,tag:f,props:{},children:[{type:a,value:"❯ helm search repo omegion\u002Fvault-unseal-cronjob\nNAME                            CHART VERSION   APP VERSION DESCRIPTION\nomegion\u002Fvault-unseal-cronjob    "},{type:b,tag:c,props:{className:[d,j]},children:[{type:a,value:ag}]},{type:a,value:".0           "},{type:b,tag:c,props:{className:[d,j]},children:[{type:a,value:ag}]},{type:a,value:".0       A chart "},{type:b,tag:c,props:{className:[d,H]},children:[{type:a,value:I}]},{type:a,value:" unseal Vault "},{type:b,tag:c,props:{className:[d,D]},children:[{type:a,value:Q}]},{type:a,value:" job\n"}]}]}]},{type:a,value:e},{type:b,tag:g,props:{},children:[{type:a,value:"You can see the cronjob chart. Let's install it on our cluster."}]},{type:a,value:e},{type:b,tag:p,props:{id:Z},children:[{type:b,tag:q,props:{ariaHidden:r,href:"#helm-chart-install",tabIndex:s},children:[{type:b,tag:c,props:{className:[t,u,v]},children:[]}]},{type:a,value:_}]},{type:a,value:e},{type:b,tag:g,props:{},children:[{type:a,value:"Before we install our Vault Unseal helm chart, let's create "},{type:b,tag:f,props:{},children:[{type:a,value:J}]},{type:a,value:" file\nwhich will contain Vault server details for the job."}]},{type:a,value:e},{type:b,tag:k,props:{className:[l]},children:[{type:b,tag:c,props:{className:["filename"]},children:[{type:a,value:J}]},{type:b,tag:m,props:{className:[n,"language-yaml"]},children:[{type:b,tag:f,props:{},children:[{type:b,tag:c,props:{className:[d,E,F]},children:[{type:a,value:"schedule"}]},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:x}]},{type:a,value:i},{type:b,tag:c,props:{className:[d,y]},children:[{type:a,value:"'\"*\u002F30 * * * *\"'"}]},{type:a,value:i},{type:b,tag:c,props:{className:[d,"comment"]},children:[{type:a,value:"# Runs every 30 mins."}]},{type:a,value:e},{type:b,tag:c,props:{className:[d,E,F]},children:[{type:a,value:P}]},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:x}]},{type:a,value:"\n  "},{type:b,tag:c,props:{className:[d,E,F]},children:[{type:a,value:ae}]},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:x}]},{type:a,value:" https"},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:x}]},{type:a,value:"\u002F\u002Fvault.mydomain.com\n  "},{type:b,tag:c,props:{className:[d,E,F]},children:[{type:a,value:"shards"}]},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:x}]},{type:a,value:K},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:L}]},{type:a,value:i},{type:b,tag:c,props:{className:[d,y]},children:[{type:a,value:"\"SHARD_1\""}]},{type:a,value:K},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:L}]},{type:a,value:i},{type:b,tag:c,props:{className:[d,y]},children:[{type:a,value:"\"SHARD_2\""}]},{type:a,value:K},{type:b,tag:c,props:{className:[d,h]},children:[{type:a,value:L}]},{type:a,value:i},{type:b,tag:c,props:{className:[d,y]},children:[{type:a,value:"\"SHARD_3\""}]},{type:a,value:e}]}]}]},{type:a,value:e},{type:b,tag:g,props:{},children:[{type:a,value:"Once we have "},{type:b,tag:f,props:{},children:[{type:a,value:J}]},{type:a,value:" file created and details are provided, let's install\nthe helm chart with it."}]},{type:a,value:e},{type:b,tag:k,props:{className:[l]},children:[{type:b,tag:m,props:{className:[n,w]},children:[{type:b,tag:f,props:{},children:[{type:a,value:"❯ helm "},{type:b,tag:c,props:{className:[d,D]},children:[{type:a,value:"install"}]},{type:a,value:" vault-unseal-cronjob omegion\u002Fvault-unseal-cronjob --values values.yaml\nNAME: vault-unseal-cronjob\nLAST DEPLOYED: Wed Apr  "},{type:b,tag:c,props:{className:[d,j]},children:[{type:a,value:"7"}]},{type:a,value:i},{type:b,tag:c,props:{className:[d,j]},children:[{type:a,value:"20"}]},{type:a,value:":42:17 "},{type:b,tag:c,props:{className:[d,j]},children:[{type:a,value:"2021"}]},{type:a,value:"\nNAMESPACE: default\nSTATUS: deployed\nREVISION: "},{type:b,tag:c,props:{className:[d,j]},children:[{type:a,value:"1"}]},{type:a,value:"\nTEST SUITE: None\n"}]}]}]},{type:a,value:e},{type:b,tag:g,props:{},children:[{type:a,value:"We successfully deployed the job, let's check it with "},{type:b,tag:f,props:{},children:[{type:a,value:ad}]},{type:a,value:x}]},{type:a,value:e},{type:b,tag:k,props:{className:[l]},children:[{type:b,tag:m,props:{className:[n,w]},children:[{type:b,tag:f,props:{},children:[{type:a,value:"❯ kubectl get cronjob vault-unseal-cronjob\nNAME                   SCHEDULE       SUSPEND   ACTIVE   LAST SCHEDULE   AGE\nvault-unseal-cronjob   *\u002F30 * * * *   False     "},{type:b,tag:c,props:{className:[d,j]},children:[{type:a,value:M}]},{type:a,value:"        "},{type:b,tag:c,props:{className:[d,z]},children:[{type:a,value:"\u003C"}]},{type:a,value:"none"},{type:b,tag:c,props:{className:[d,z]},children:[{type:a,value:"\u003E"}]},{type:a,value:"          54s\n"}]}]}]},{type:a,value:e},{type:b,tag:p,props:{id:$},children:[{type:b,tag:q,props:{ariaHidden:r,href:"#test-cron-job",tabIndex:s},children:[{type:b,tag:c,props:{className:[t,u,v]},children:[]}]},{type:a,value:aa}]},{type:a,value:e},{type:b,tag:g,props:{},children:[{type:a,value:"The job will run every "},{type:b,tag:f,props:{},children:[{type:a,value:"30"}]},{type:a,value:" minutes. Let's create a job from the cronjob that we\ncreated to test it."}]},{type:a,value:e},{type:b,tag:k,props:{className:[l]},children:[{type:b,tag:m,props:{className:[n,w]},children:[{type:b,tag:f,props:{},children:[{type:a,value:"❯ kubectl create job --from"},{type:b,tag:c,props:{className:[d,z]},children:[{type:a,value:N}]},{type:a,value:"cronjob\u002Fvault-unseal-cronjob manual-unseal-job\njob.batch\u002Fmanual-unseal-job created\n"}]}]}]},{type:a,value:e},{type:b,tag:g,props:{},children:[{type:a,value:"Let's see the logs of the job that we created."}]},{type:a,value:e},{type:b,tag:k,props:{className:[l]},children:[{type:b,tag:m,props:{className:[n,w]},children:[{type:b,tag:f,props:{},children:[{type:a,value:"❯ kubectl get pods --selector"},{type:b,tag:c,props:{className:[d,z]},children:[{type:a,value:N}]},{type:a,value:"job-name"},{type:b,tag:c,props:{className:[d,z]},children:[{type:a,value:N}]},{type:a,value:"manual-unseal-job\nNAME                      READY   STATUS      RESTARTS   AGE\nmanual-unseal-job-bsjwv   "},{type:b,tag:c,props:{className:[d,j]},children:[{type:a,value:M}]},{type:a,value:"\u002F1     Completed   "},{type:b,tag:c,props:{className:[d,j]},children:[{type:a,value:M}]},{type:a,value:"          102s\n\n❯ kubectl logs manual-unseal-job-bsjwv                    \nIt is unsealed.\n"}]}]}]},{type:a,value:e},{type:b,tag:g,props:{},children:[{type:a,value:"As my Vault server is already unsealed, the job logged that it is unsealed."}]},{type:a,value:e},{type:b,tag:p,props:{id:ab},children:[{type:b,tag:q,props:{ariaHidden:r,href:"#conclusion",tabIndex:s},children:[{type:b,tag:c,props:{className:[t,u,v]},children:[]}]},{type:a,value:ac}]},{type:a,value:e},{type:b,tag:g,props:{},children:[{type:a,value:"Self-managing the Vault server on a Kubernetes cluster is hard. It can get\nsealed if the pod recreated. We used the Vault Unsealed CLI tool with Kubernetes\nCronJob to automatically unseal it. It is not a perfect solution, however, it is\nthe only free way to keep your Vault server unsealed."}]}]},dir:"\u002Farticles",path:"\u002Farticles\u002Fhow-to-automatically-unseal-vault-server-for-free",extension:".md",updatedAt:"2022-01-09T13:05:34.247Z",readingTime:175200},fetchState:{error:null,pending:false,timestamp:1641733612593}}},mutations:void 0}}("text","element","span","token","\n","code","p","punctuation"," ","number","div","nuxt-content-highlight","pre","line-numbers",2,"h2","a","true",-1,"mdi","mdi-24px","mdi-link-variant","language-bash",":","string","operator","li","builtin","class-name","function","key","atrule","command","keyword","for","values.yaml","\n    ","-","0","=","kubernetes","vault","cron","introduction","Introduction","prerequisites","Prerequisites","vault-unseal-cli","Vault Unseal CLI","helm-repository","Helm Repository","helm-chart-install","Helm Chart Install","test-cron-job","Test Cron Job","conclusion","Conclusion","kubectl","address","help","0.3")));