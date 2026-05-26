      <section className="container projects-section">
        <SectionTitle
          eyebrow="Projects"
          title="核心项目"
          desc="每个项目按照“业务场景、技术方案、解决问题、工程效果”的思路展示，方便面试官快速理解项目价值。"
        />

        <div className="project-list">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      <section className="container footer-cta">
        <div>
          <h2>持续完善项目文档</h2>
          <p>
            我会继续补充项目 README、架构图、核心流程图、接口说明、部署说明和复盘文档，
            让项目从“简历描述”变成“可访问、可验证、可复盘”的作品集。
          </p>
        </div>

        <a
          className="btn light"
          href={PROFILE.github}
          target="_blank"
          rel="noreferrer"
        >
          <ExternalLink size={17} /> 查看全部项目
        </a>
      </section>
    </main>
  )
}
