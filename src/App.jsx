import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Bot,
  Database,
  ExternalLink,
  FileText,
  GitBranch,
  GraduationCap,
  Mail,
  MessageSquare,
  Search,
  Server,
  ShieldCheck,
  UploadCloud,
  Layers,
  Sparkles,
  CheckCircle2,
  Download,
} from 'lucide-react'

const PROFILE = {
  name: '陆鹏宇',
  title: 'Java 后端开发 / AI 应用开发',
  school: '南京理工大学 · 计算机技术 · 2027 届',
  email: '2592875730@qq.com',
  github: 'https://github.com/Yu2ovo',
  resumeUrl: '/陆鹏宇-南京理工大学--2027届 .pdf',
}

const projects = [
  {
    id: 'cloud-course',
    name: '云学堂在线教育平台',
    subtitle: 'Spring Cloud 微服务项目',
    github: 'https://github.com/Yu2ovo/java-project',
    demo: 'https://yu2ovo.github.io/cloudclass-demo/',
    icon: Server,
    summary:
      '面向在线教育业务场景的后端微服务系统，覆盖课程管理、媒资管理、课程搜索、订单支付、选课学习、认证授权等核心模块。',
    stack: [
      'Spring Boot',
      'Spring Cloud Alibaba',
      'Nacos',
      'Gateway',
      'OpenFeign',
      'MySQL',
      'Redis',
      'RabbitMQ',
      'Elasticsearch',
      'MinIO',
      'XXL-JOB',
      'OAuth2/JWT',
    ],
    highlights: [
      {
        title: '课程搜索',
        icon: Search,
        text:
          '课程发布后将 CoursePublish 转换为 CourseIndex 写入 Elasticsearch，基于 BoolQuery 实现关键词、分类、难度、价格等多条件检索，并通过聚合返回筛选项。',
      },
      {
        title: '大文件断点续传',
        icon: UploadCloud,
        text:
          '针对课程视频体积大、上传失败后重复上传成本高的问题，基于文件 MD5 实现秒传校验、分片存在性校验、分片上传和 MinIO 服务端合并。',
      },
      {
        title: '支付结果异步通知',
        icon: MessageSquare,
        text:
          '订单支付成功后通过 RabbitMQ 通知学习服务，学习服务消费消息后更新选课状态并加入课程表，实现订单服务与学习服务解耦。',
      },
      {
        title: '认证授权',
        icon: ShieldCheck,
        text:
          '基于 Spring Security + OAuth2 + JWT 实现统一认证授权，将用户权限写入 authorities，并通过 @PreAuthorize 实现方法级权限控制。',
      },
    ],
    star: [
      '在课程视频文件较大、网络波动导致上传失败后重复上传成本高的场景下，设计并实现分片上传与断点续传流程。',
      '前端上传前计算文件 MD5，后端提供 checkfile/checkchunk 接口校验完整文件和分片是否已存在。',
      '所有分片上传完成后，服务端通过 MinIO 合并分片，并重新计算 MD5 与原始文件 MD5 对比，保证文件完整性。',
      '该方案支持只上传缺失分片，避免失败后重复上传完整视频，提升媒资上传稳定性。',
    ],
  },
  {
    id: 'ai-customer-service',
    name: 'AI 智能客服',
    subtitle: 'Spring AI / RAG / Tool Calling / MCP',
    github: 'https://github.com/Yu2ovo/AI-customer-service',
    icon: Bot,
    summary:
      '面向客服问答场景的 AI 应用系统，支持多轮对话、业务知识库检索、工具调用和外部 MCP 服务扩展。',
    stack: [
      'Spring Boot',
      'Spring AI',
      '通义千问',
      '阿里云百炼',
      'RAG',
      'QueryTransformer',
      'Tool Calling',
      'MCP Server',
      'SSE',
    ],
    highlights: [
      {
        title: '统一模型调用',
        icon: Sparkles,
        text:
          '基于 Spring AI 接入通义千问等大模型，并封装统一调用接口，便于后续切换不同模型服务。',
      },
      {
        title: 'RAG 知识库增强',
        icon: FileText,
        text:
          '针对大模型缺少业务私有知识、容易产生幻觉的问题，接入业务知识库检索能力，将相关文档片段注入模型上下文。',
      },
      {
        title: '多轮对话记忆',
        icon: MessageSquare,
        text:
          '基于 MessageChatMemoryAdvisor 与 ChatMemory 管理会话上下文，使模型能够结合历史对话理解用户连续追问。',
      },
      {
        title: '工具调用与 MCP 扩展',
        icon: Layers,
        text:
          '基于 Tool Calling 封装文件操作、网页抓取等工具，并通过 MCP Server 对接图片检索能力，扩展 AI 外部工具调用范围。',
      },
    ],
    star: [
      '在传统客服依赖固定问答模板、难以处理自然语言提问的场景下，基于大模型构建智能客服问答能力。',
      '通过角色定位、few-shot 示例和输出格式约束优化 Prompt，提高回答稳定性和业务相关性。',
      '通过 RAG 检索业务知识片段并注入 Prompt，降低模型脱离业务知识凭空回答的风险。',
      '通过 Tool Calling 和 MCP 扩展外部工具调用能力，使 AI 能够处理文件、网页抓取、图片检索等复杂任务。',
    ],
  },
]

const skills = [
  'Java',
  'Spring Boot',
  'Spring Cloud Alibaba',
  'MyBatis-Plus',
  'MySQL',
  'Redis',
  'RabbitMQ',
  'Elasticsearch',
  'MinIO',
  'XXL-JOB',
  'Spring AI',
  'RAG',
]

function Badge({ children }) {
  return <span className="badge">{children}</span>
}

function SectionTitle({ eyebrow, title, desc }) {
  return (
    <div className="section-title">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {desc && <p className="section-desc">{desc}</p>}
    </div>
  )
}

function ProjectCard({ project }) {
  const Icon = project.icon
  return (
    <motion.article
      className="project-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45 }}
    >
      <div className="project-head">
        <div className="project-title-wrap">
          <div className="project-icon"><Icon size={26} /></div>
          <div>
            <h3>{project.name}</h3>
            <p>{project.subtitle}</p>
          </div>
        </div>
        <div className="project-actions">
          <a className="btn secondary" href={project.github} aria-label="GitHub 地址">
            <GitBranch size={16} /> GitHub
          </a>
          <a className="btn primary" href={project.demo} aria-label="在线演示地址">
            <ExternalLink size={16} /> Demo
          </a>
        </div>
      </div>

      <p className="project-summary">{project.summary}</p>

      <div className="badge-list">
        {project.stack.map((item) => (
          <Badge key={item}>{item}</Badge>
        ))}
      </div>

      <div className="highlight-grid">
        {project.highlights.map((item) => {
          const ItemIcon = item.icon
          return (
            <div key={item.title} className="highlight-card">
              <div className="highlight-title"><ItemIcon size={17} /> {item.title}</div>
              <p>{item.text}</p>
            </div>
          )
        })}
      </div>

      <div className="star-box">
        <div className="star-title"><CheckCircle2 size={20} /> STAR 项目亮点</div>
        <div className="star-list">
          {project.star.map((item, index) => (
            <div className="star-item" key={item}>
              <span>{index + 1}</span>
              <p>{item}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.article>
  )
}

export default function App() {
  const [keyword, setKeyword] = useState('')

  const filteredProjects = useMemo(() => {
    const q = keyword.trim().toLowerCase()
    if (!q) return projects
    return projects.filter((project) => {
      const text = [project.name, project.subtitle, project.summary, ...project.stack]
        .join(' ')
        .toLowerCase()
      return text.includes(q)
    })
  }, [keyword])

  return (
    <main>
      <section className="hero">
        <div className="container hero-grid">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="pill"><GraduationCap size={16} /> {PROFILE.school}</div>
            <h1>{PROFILE.name}的项目展示站</h1>
            <p className="hero-desc">
              聚焦 Java 后端、微服务架构与 AI 应用开发。这里展示我的核心项目：云学堂在线教育平台与 AI 智能客服，突出业务流程、技术选型、工程优化和可复盘的项目亮点。
            </p>
            <div className="hero-actions">
              <a className="btn primary" href={PROFILE.resumeUrl}><Download size={17} /> 下载简历</a>
              <a className="btn secondary" href={PROFILE.github}><GitBranch size={17} /> GitHub</a>
              <a className="btn secondary" href={`mailto:${PROFILE.email}`}><Mail size={17} /> 联系我</a>
            </div>
          </motion.div>

          <motion.div
            className="skill-panel"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="eyebrow left">Core Skills</p>
            <h2>技术栈概览</h2>
            <div className="badge-list skill-badges">
              {skills.map((skill) => <Badge key={skill}>{skill}</Badge>)}
            </div>
            <div className="skill-note"><b>后端方向：</b>Spring Boot、MyBatis、MySQL、Redis、RabbitMQ、Elasticsearch</div>
            <div className="skill-note"><b>微服务方向：</b>Nacos、Gateway、OpenFeign、OAuth2、JWT、XXL-JOB</div>
            <div className="skill-note"><b>AI 应用方向：</b>Spring AI、RAG、Prompt、Tool Calling、MCP</div>
          </motion.div>
        </div>
      </section>

      <section className="search-bar-section">
        <div className="container search-row">
          <div>
            <p className="search-label">项目检索</p>
            <p>输入技术关键词，例如 Redis、RabbitMQ、RAG、Elasticsearch。</p>
          </div>
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="搜索项目或技术栈..."
          />
        </div>
      </section>

      <section className="container projects-section">
        <SectionTitle
          eyebrow="Projects"
          title="核心项目"
          desc="每个项目按照“业务场景、技术方案、解决问题、工程效果”的思路展示，方便面试官快速理解项目价值。"
        />
        <div className="project-list">
          {filteredProjects.map((project) => <ProjectCard key={project.id} project={project} />)}
        </div>
      </section>

       <section className="container footer-cta">
        <div>
          <h2>后续可以继续扩展</h2>
          <p>可以继续补充在线 Demo、接口文档、架构图、核心流程图、压测报告和部署说明，让项目从“简历描述”变成“可访问、可验证、可复盘”的作品集。</p>
        </div>
        <a className="btn light" href="#"><ExternalLink size={17} /> 查看项目文档</a>
      </section> 
    </main>
  )
}
